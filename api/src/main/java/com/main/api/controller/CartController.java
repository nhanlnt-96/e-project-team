package com.main.api.controller;

import com.main.api.dao.*;
import com.main.api.dto.CartDto;
import com.main.api.dto.ProductCartDto;
import com.main.api.entity.*;
import com.main.api.model.CartModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class CartController {
    private final CartRepository cartRepository;
    private final ProductCartRepository productCartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NetWeightRepository netWeightRepository;
    private final ProductQuantityRepository productQuantityRepository;

    @Autowired
    public CartController(CartRepository cartRepository, ProductCartRepository productCartRepository, ProductRepository productRepository, UserRepository userRepository, NetWeightRepository netWeightRepository, ProductQuantityRepository productQuantityRepository) {
        this.cartRepository = cartRepository;
        this.productCartRepository = productCartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.netWeightRepository = netWeightRepository;
        this.productQuantityRepository = productQuantityRepository;
    }

    @PostMapping("/add-to-cart")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<CartDto> addToCart(@Valid @RequestBody CartModel.AddToCart addToCart) {
        Product productData = getProductData(addToCart.getProductId());
        NetWeight netWeightData = getNetWeight(addToCart.getNetWeightId());
        User userData = getUserData();
        Cart cart = getCartByUserId(userData.getUserId());
        ProductQuantity productQuantity = getProductQuantityByNetWeightId(addToCart.getNetWeightId(), productData.getProductId());
        Date currentDate = new Date();
        if (addToCart.getQuantity() > productQuantity.getQuantity())
            throw new NoResultException("Quantity can not be larger than the current product quantity");

        Cart cartData;

        cartData = Objects.requireNonNullElseGet(cart, () -> new Cart(userData, currentDate));

        cartData.addItem(productData, netWeightData, addToCart.getQuantity());

        Cart returnCart = cartRepository.save(cartData);

        List<ProductCartDto> productCartDtoList = generateListProductCartDto(returnCart.getProductCarts());

        CartDto cartDto = new CartDto();
        cartDto.setId(returnCart.getId());
        cartDto.setProductCartDtoList(productCartDtoList);
        cartDto.setUserId(returnCart.getUser().getUserId());

        return new ResponseEntity<>(cartDto, HttpStatus.CREATED);
    }

    private String getUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private User getUserData() {
        String userEmail = getUserEmail();
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new NoResultException("User does not exist"));
    }

    private Product getProductData(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new NoResultException("Product does not exist"));
    }

    private Cart getCartByUserId(Long userId) {
        return cartRepository.findByUser_UserId(userId).orElse(null);
    }

    private NetWeight getNetWeight(Long netWeightId) {
        return netWeightRepository.findById(netWeightId).orElseThrow(() -> new NoResultException("Net weight does not exist"));
    }

    private ProductQuantity getProductQuantityByNetWeightId(Long netWeightId, Long productId) {
        return productQuantityRepository.findProductQuantityByNetWeight_NetWeightIdAndProduct_ProductId(netWeightId, productId).orElseThrow(() -> new NoResultException("Product quantity for this net weigh does not exist"));
    }

    private List<ProductCartDto> generateListProductCartDto(Set<ProductCart> productCarts) {
        return productCarts.stream().map(this::generateItemProductCartDto).collect(Collectors.toList());
    }

    private ProductCartDto generateItemProductCartDto(ProductCart productCart) {
        return new ProductCartDto(productCart.getProduct().getProductId(), productCart.getProduct().getDescription(), productCart.getProduct().getProductName(), ProductController.handleGenerateImageDto(productCart.getProduct().getProductImages()), ProductCategoryController.generateCategoryData(productCart.getProduct().getCategory()), NetWeightController.generateNetWeightDto(productCart.getNetWeight()), productCart.getQuantity());
    }
}
