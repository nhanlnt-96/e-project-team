package com.main.api.controller;

import com.main.api.constant.Constant;
import com.main.api.dao.*;
import com.main.api.dto.OrderDto;
import com.main.api.dto.OrderItemDto;
import com.main.api.dto.PaymentInfoDto;
import com.main.api.dto.ProductCartDto;
import com.main.api.entity.*;
import com.main.api.model.CheckoutModel;
import org.hibernate.annotations.Check;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class CheckoutController {
    final private OrderRepository orderRepository;
    final private OrderItemRepository orderItemRepository;
    final private CartRepository cartRepository;
    final private UserRepository userRepository;
    final private ProductQuantityRepository productQuantityRepository;
    final private ProductRepository productRepository;
    final private PaymentInfoRepository paymentInfoRepository;

    public CheckoutController(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartRepository cartRepository, UserRepository userRepository, ProductQuantityRepository productQuantityRepository, ProductRepository productRepository, PaymentInfoRepository paymentInfoRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.productRepository = productRepository;
        this.paymentInfoRepository = paymentInfoRepository;
    }

    @PostMapping("/create-order")
    @RolesAllowed("ROLE_USER")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CheckoutModel.CreateOrder createOrder) {
        Date currentDate = new Date();
        User userData = getUserData();
        Cart currentCart = getCurrentCart(userData.getUserId());
        Order orderData = new Order();
        orderData.setUser(userData);
        orderData.setShippingAddress(createOrder.getShippingAddress());
        orderData.setReceiverName(createOrder.getReceiverName());
        orderData.setReceiverPhone(createOrder.getReceiverPhone());
        orderData.setPaymentMethod(createOrder.getPaymentMethod());
        orderData.setCreatedAt(currentDate);
        orderData.setShippingStatus(Constant.SHIPPING_STATUS_SHIPPING);
        if (createOrder.getPaymentInfo() != null) {
            orderData.setPaymentStatus(Constant.PAYMENT_STATUS_PAID);
        } else {
            orderData.setPaymentStatus(Constant.PAYMENT_STATUS_PENDING);
        }
        Order createOrderResponse = orderRepository.save(orderData);
        if (createOrderResponse.getId() != 0) {
            PaymentInfoDto paymentInfoDto = new PaymentInfoDto();
            if (Objects.equals(createOrder.getPaymentMethod(), Constant.PAYMENT_METHOD_PAYPAL)) {
                if (createOrder.getPaymentInfo() != null) {
                    CheckoutModel.PaymentInfo paymentInfoData = createOrder.getPaymentInfo();
                    PaymentInfo paymentInfo = new PaymentInfo(paymentInfoData.getPaymentId(), paymentInfoData.getPaymentCreated(), paymentInfoData.getPayeeName(), paymentInfoData.getPayeeEmail(), paymentInfoData.getPaymentCaptureId(), createOrderResponse);
                    PaymentInfo savePaymentInfo = paymentInfoRepository.save(paymentInfo);
                    if (savePaymentInfo.getId() != 0) {
                        paymentInfoDto = generatePaymentInfoDto(savePaymentInfo);
                    }
                } else {
                    throw new NoResultException("Payment info can not be null when payment method is PayPal");
                }
            }

            List<OrderItem> orderItems = currentCart.getProductCarts().stream().map(product -> generateOrderItem(product, createOrderResponse)).collect(Collectors.toList());
            List<OrderItem> saveDataResponse = orderItemRepository.saveAll(orderItems);
            if (saveDataResponse.size() > 0) {
                // INFO: update product quantity
                for (ProductCart productCart : currentCart.getProductCarts()) {
                    Product productData = productRepository.findById(productCart.getProduct().getProductId()).orElseThrow(() -> new NoResultException("Product does not exist"));
                    ProductQuantity productQuantity = productQuantityRepository.findProductQuantityByNetWeight_NetWeightIdAndProduct_ProductId(productCart.getNetWeight().getNetWeightId(), productCart.getProduct().getProductId()).orElseThrow(() -> new NoResultException("Can not create order with product " + productCart.getProduct().getProductName() + ". Because product's net weight " + productCart.getNetWeight().getNetWeightLabel() + " is out of stock"));
                    int newQuantity = productQuantity.getQuantity() - productCart.getQuantity();
                    if (newQuantity <= 0) {
                        productData.getProductQuantities().remove(productQuantity);
                        productQuantityRepository.delete(productQuantity);
                    } else {
                        productQuantity.setQuantity(newQuantity);
                        productQuantityRepository.saveAndFlush(productQuantity);
                    }
                }
                // INFO: remove current cart
                cartRepository.delete(currentCart);

                return new ResponseEntity<>(generateOrderDto(orderData, saveDataResponse, paymentInfoDto), HttpStatus.CREATED);
            }
        }
        throw new NoResultException("Create order failed");
    }

    @GetMapping("/get-all-order")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<List<OrderDto>> getAllOrder() {
        User userData = getUserData();
        return new ResponseEntity<>(getOrderByUserId(userData.getUserId()), HttpStatus.OK);
    }

    @GetMapping("/get-user-order/{userId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    public ResponseEntity<List<OrderDto>> getUserOrderById(@PathVariable("userId") Long userId) {
        User userData = userRepository.findById(userId).orElseThrow(() -> new NoResultException("User does not exist"));
        return new ResponseEntity<>(getOrderByUserId(userData.getUserId()), HttpStatus.OK);
    }

    @PutMapping("/update-shipping-status")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<OrderDto> updateShippingStatus(@Valid @RequestBody CheckoutModel.UpdateShippingStatus updateShippingStatus) {
        Order orderData = orderRepository.findById(updateShippingStatus.getOrderId()).orElseThrow(() -> new NoResultException("Order does not exist"));
        PaymentInfo paymentInfo = paymentInfoRepository.findAllByOrder_Id(orderData.getId());
        orderData.setShippingStatus(updateShippingStatus.getShippingStatus());
        Order updateOrder = orderRepository.saveAndFlush(orderData);
        return new ResponseEntity<>(generateOrderDto(updateOrder, new ArrayList<>(updateOrder.getOrderItems()), generatePaymentInfoDto(paymentInfo)), HttpStatus.OK);
    }

    private List<OrderDto> getOrderByUserId(Long userId) {
        List<Order> orderList = orderRepository.findByUser_UserId(userId).orElse(null);
        List<OrderDto> orderDtos = new ArrayList<>();
        if (orderList != null) {
            for (Order order : orderList) {
                PaymentInfo paymentInfo = paymentInfoRepository.findAllByOrder_Id(order.getId());
                orderDtos.add(generateOrderDto(order, new ArrayList<>(order.getOrderItems()), generatePaymentInfoDto(paymentInfo)));
            }
        }
        return orderDtos;
    }

    private Cart getCurrentCart(Long userId) {
        return cartRepository.findByUser_UserId(userId).orElseThrow(() -> new NoResultException("Cart does not exist with user"));
    }

    private User getUserData() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new NoResultException("User does not exist"));
    }

    private OrderItem generateOrderItem(ProductCart productCart, Order order) {
        ProductCartDto productCartDto = CartController.generateItemProductCartDto(productCart);
        return new OrderItem(productCartDto.getQuantity(), productCartDto.getProductQuantityDto().getPrice(), order, productCart.getProduct(), productCart.getNetWeight());
    }

    private OrderItemDto generateOrderItemDto(OrderItem orderItem) {
        return new OrderItemDto(orderItem.getId(), orderItem.getQuantity(), orderItem.getPrice(), orderItem.getProduct().getProductName(), orderItem.getNetWeight().getNetWeightLabel());
    }

    private OrderDto generateOrderDto(Order order, List<OrderItem> orderItem, PaymentInfoDto paymentInfoDto) {
        List<OrderItemDto> orderItemDtos = orderItem.stream().map(this::generateOrderItemDto).collect(Collectors.toList());
        return new OrderDto(order.getId(), order.getShippingStatus(), order.getPaymentMethod(), order.getPaymentStatus(), order.getShippingAddress(), order.getReceiverName(), order.getReceiverPhone(), order.getCreatedAt(), orderItemDtos, paymentInfoDto);
    }

    private PaymentInfoDto generatePaymentInfoDto(PaymentInfo paymentInfo) {
        PaymentInfoDto paymentInfoDto = new PaymentInfoDto();
        paymentInfoDto.setId(paymentInfo.getId());
        paymentInfoDto.setOrderId(paymentInfo.getOrder().getId());
        paymentInfoDto.setPaymentId(paymentInfo.getPaymentId());
        paymentInfoDto.setPaymentCreated(paymentInfo.getPaymentCreated());
        paymentInfoDto.setPayeeName(paymentInfo.getPayeeName());
        paymentInfoDto.setPayeeEmail(paymentInfo.getPayeeEmail());
        paymentInfoDto.setPaymentCaptureId(paymentInfo.getPaymentCaptureId());

        return paymentInfoDto;
    }
}
