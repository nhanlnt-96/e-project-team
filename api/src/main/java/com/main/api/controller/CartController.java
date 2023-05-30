package com.main.api.controller;

import com.main.api.dao.*;
import com.main.api.dto.CartDto;
import com.main.api.dto.ProductCartDto;
import com.main.api.dto.ProductQuantityDto;
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

        return new ResponseEntity<>(generateCartDto(returnCart, productCartDtoList), HttpStatus.CREATED);
    }

    @GetMapping("/get-current-cart")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> getCurrentCart() {
        User userData = getUserData();
        Cart cart = getCartByUserId(userData.getUserId());
        if (cart != null) {
            List<ProductCartDto> productCartDtoList = generateListProductCartDto(cart.getProductCarts());
            return new ResponseEntity<>(generateCartDto(cart, productCartDtoList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cart is empty", HttpStatus.OK);
        }
    }

    @DeleteMapping("/remove-from-cart")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<CartDto> removeFromCart(@Valid @RequestBody CartModel.RemoveFromCart removeFromCart) {
        User userData = getUserData();
        Cart cart = getCartByUserId(userData.getUserId());
        ProductCart existingItem = cart.getProductCarts().stream().filter(item -> item.getProduct().getProductId().equals(removeFromCart.getProductId()) && item.getNetWeight().getNetWeightId().equals(removeFromCart.getNetWeightId())).findAny().orElseThrow(() -> new NoResultException("Product cart does not have this item"));

        cart.getProductCarts().remove(existingItem);
        productCartRepository.delete(existingItem);

        Cart returnCart = cartRepository.save(cart);

        List<ProductCartDto> productCartDtoList = generateListProductCartDto(returnCart.getProductCarts());

        return new ResponseEntity<>(generateCartDto(returnCart, productCartDtoList), HttpStatus.OK);
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
        return productCarts.stream().map(CartController::generateItemProductCartDto).collect(Collectors.toList());
    }

    public static ProductCartDto generateItemProductCartDto(ProductCart productCart) {
        Long netWeightId = productCart.getNetWeight().getNetWeightId();
        ProductQuantity productQuantity = productCart.getProduct().getProductQuantities().stream().filter(product -> product.getNetWeight().getNetWeightId().equals(netWeightId)).findFirst().orElse(null);
        assert productQuantity != null;
        return new ProductCartDto(productCart.getProduct().getProductId(), productCart.getProduct().getDescription(), productCart.getProduct().getProductName(), ProductController.handleGenerateImageDto(productCart.getProduct().getProductImages()), ProductCategoryController.generateCategoryData(productCart.getProduct().getCategory()), NetWeightController.generateNetWeightDto(productCart.getNetWeight()), new ProductQuantityDto(productQuantity.getQuantityId(), productQuantity.getQuantity(), productQuantity.getPrice(), productQuantity.getNetWeight()), productCart.getQuantity());
    }

    private CartDto generateCartDto(Cart cart, List<ProductCartDto> productCartDto) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setProductCartDtoList(productCartDto.stream().sorted(Comparator.comparing(ProductCartDto::getProductName)).collect(Collectors.toList()));
        cartDto.setUserId(cart.getUser().getUserId());

        return cartDto;
    }
}
