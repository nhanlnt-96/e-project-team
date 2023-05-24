package com.main.api.controller;

import com.main.api.constant.Constant;
import com.main.api.dao.CartRepository;
import com.main.api.dao.OrderItemRepository;
import com.main.api.dao.OrderRepository;
import com.main.api.dao.UserRepository;
import com.main.api.dto.OrderDto;
import com.main.api.dto.OrderItemDto;
import com.main.api.dto.ProductCartDto;
import com.main.api.entity.*;
import com.main.api.model.CheckoutModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class CheckoutController {
    final private OrderRepository orderRepository;
    final private OrderItemRepository orderItemRepository;
    final private CartRepository cartRepository;
    final private UserRepository userRepository;

    public CheckoutController(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartRepository cartRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create-order")
    @RolesAllowed("ROLE_USER")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CheckoutModel.CreateOrder createOrder) {
        Date currentDate = new Date();
        User userData = getUserData();
        Cart currentCart = getCurrentCart(userData.getUserId());
        Order checkOrderExist = orderRepository.findByUser_UserId(userData.getUserId()).orElse(null);
        Order orderData;
        orderData = Objects.requireNonNullElseGet(checkOrderExist, Order::new);
        if (checkOrderExist == null) orderData.setCreatedAt(currentDate);
        orderData.setUser(userData);
        orderData.setShippingAddress(createOrder.getShippingAddress());
        orderData.setReceiverName(createOrder.getReceiverName());
        orderData.setReceiverPhone(createOrder.getReceiverPhone());
        orderData.setPaymentMethod(createOrder.getPaymentMethod());
        orderData.setShippingStatus(Constant.SHIPPING_SHIPPING);
        orderData.setPaymentStatus(Constant.PAYMENT_STATUS_PENDING);

        Order createOrderResponse = orderRepository.save(orderData);
        if (createOrderResponse.getId() != 0) {
            List<OrderItem> orderItems = currentCart.getProductCarts().stream().map(product -> generateOrderItem(product, createOrderResponse)).collect(Collectors.toList());
            List<OrderItem> saveDataResponse = orderItemRepository.saveAll(orderItems);
            if (saveDataResponse.size() > 0) {
                return new ResponseEntity<>(generateOrderDto(orderData, saveDataResponse), HttpStatus.CREATED);
            }
        }
        throw new NoResultException("Create order failed");
    }

    private String getUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
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

    private OrderDto generateOrderDto(Order order, List<OrderItem> orderItem) {
        List<OrderItemDto> orderItemDtos = orderItem.stream().map(this::generateOrderItemDto).collect(Collectors.toList());
        return new OrderDto(order.getId(), order.getShippingStatus(), order.getPaymentMethod(), order.getPaymentStatus(), order.getShippingAddress(), order.getReceiverName(), order.getReceiverPhone(), order.getCreatedAt(), orderItemDtos);
    }
}
