package com.main.api.controller;

import com.main.api.dao.ProductFavoriteRepository;
import com.main.api.dao.ProductRepository;
import com.main.api.dao.UserRepository;
import com.main.api.dto.ProductDto;
import com.main.api.dto.ProductFavoriteDto;
import com.main.api.entity.Product;
import com.main.api.entity.ProductFavorite;
import com.main.api.entity.User;
import com.main.api.model.ProductFavoriteModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product-favorite")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
@Validated
public class ProductFavoriteController {
    final private ProductFavoriteRepository productFavoriteRepository;
    final private UserRepository userRepository;
    final private ProductRepository productRepository;

    public ProductFavoriteController(ProductFavoriteRepository productFavoriteRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.productFavoriteRepository = productFavoriteRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/add-product-favorite")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<String> addProductFavorite(@Valid @RequestBody ProductFavoriteModel.AddProductFavorite addProductFavoriteData) {
        String userEmail = getUserEmail();
        User userData = getUserData(userEmail);
        Product productData = getProductData(addProductFavoriteData.getProductId());
        ProductFavorite checkProductExistWithUser = productFavoriteRepository.findByUser_UserId_AndProduct_ProductId(userData.getUserId(), addProductFavoriteData.getProductId());
        if (checkProductExistWithUser != null) throw new NoResultException("Product has been added");

        ProductFavorite addProductFavorite = new ProductFavorite(userData, productData);
        ProductFavorite addProductFavoriteResponse = productFavoriteRepository.save(addProductFavorite);
        if (addProductFavoriteResponse.getId() != 0)
            return new ResponseEntity<>("Added product favorite", HttpStatus.CREATED);

        throw new NoResultException("Add product favorite failed.");
    }

    @GetMapping("/get-product-favorite")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<ProductFavoriteDto> getProductFavorite() {
        String userEmail = getUserEmail();
        User userData = getUserData(userEmail);
        List<ProductFavorite> productFavorite = productFavoriteRepository.findByUser_UserId(userData.getUserId());
        List<ProductDto> productDto = productFavorite.stream().map(favorite -> new ProductDto(favorite.getProduct(), ProductController.handleGenerateImageDto(favorite.getProduct().getProductImages()), favorite.getProduct().getCategory(), ProductController.generateProductQuantityDto(new ArrayList<>(favorite.getProduct().getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(new ProductFavoriteDto(userData.getUserId(), productDto), HttpStatus.OK);
    }

    @GetMapping("/get-user-product-favorite")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<ProductFavoriteDto> getUserProductFavorite(@Valid @RequestBody ProductFavoriteModel.GetUserProductFavorite body) {
        User userData = userRepository.findById(body.getUserId()).orElseThrow(() -> new NoResultException("User does not exist"));
        List<ProductFavorite> productFavorite = productFavoriteRepository.findByUser_UserId(userData.getUserId());
        List<ProductDto> productDto = productFavorite.stream().map(favorite -> new ProductDto(favorite.getProduct(), ProductController.handleGenerateImageDto(favorite.getProduct().getProductImages()), favorite.getProduct().getCategory(), ProductController.generateProductQuantityDto(new ArrayList<>(favorite.getProduct().getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(new ProductFavoriteDto(userData.getUserId(), productDto), HttpStatus.OK);
    }

    @DeleteMapping("/remove-product-favorite/{productId}")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<String> removeProductFavorite(@PathVariable("productId") Long productId) {
        String userEmail = getUserEmail();

        getUserData(userEmail);

        ProductFavorite productFavoriteData = productFavoriteRepository.findByProduct_ProductId(productId);
        if (productFavoriteData == null) throw new NoResultException("Product favorite does not exist.");

        productFavoriteRepository.delete(productFavoriteData);

        return new ResponseEntity<>("Removed product favorite.", HttpStatus.OK);
    }

    private static String getUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public User getUserData(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NoResultException("User does not exist"));
    }

    public Product getProductData(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new NoResultException("Product does not exist"));
    }
}
