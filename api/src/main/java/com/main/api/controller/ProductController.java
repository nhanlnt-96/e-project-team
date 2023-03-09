package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.dao.ImageRepository;
import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dao.ProductImageRepository;
import com.main.api.dao.ProductRepository;
import com.main.api.dto.ProductDto;
import com.main.api.entity.*;
import com.main.api.model.ProductModel;
import com.main.api.utils.ConvertStringToSlug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductController {
    private final ProductRepository productRepository;
    private final Validator validator;
    private final ProductImageRepository productImageRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository imageRepository;

    @Autowired

    public ProductController(ProductRepository productRepository, Validator validator, ProductImageRepository productImageRepository, ProductCategoryRepository productCategoryRepository, ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.validator = validator;
        this.productImageRepository = productImageRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.imageRepository = imageRepository;
    }

    @PostMapping("/create-product")
    public ResponseEntity<ProductDto> createProduct(@RequestParam("createProductData") String createProduct, @RequestParam("productImages") MultipartFile[] productImages) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ProductModel.CreateProduct createProductData = mapper.readValue(createProduct, ProductModel.CreateProduct.class);
        Set<ConstraintViolation<ProductModel.CreateProduct>> constraintViolation = validator.validate(createProductData);

        if (!constraintViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolation.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }
        try {
            ProductCategory productCategory = productCategoryRepository.findById(createProductData.getCategoryId()).get();
            Product productData = new Product(createProductData.getDescription(), createProductData.getProductName(), createProductData.getProductPrice());

            productData.setCategory(productCategory);

            Product saveProductResponse = productRepository.save(productData);
            if (saveProductResponse.getProductId() != 0) {
                List<String> imageNames = new ArrayList<>();
                Arrays.stream(productImages).forEach(image -> {
                    Image uploadImageResponse = null;
                    try {
                        uploadImageResponse = handleUploadImage(image);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    if (uploadImageResponse != null) {
                        imageNames.add(uploadImageResponse.getImageName());

                        ProductImage productImageData = new ProductImage();

                        productImageData.setProduct(saveProductResponse);
                        productImageData.setImage(uploadImageResponse);

                        productImageRepository.save(productImageData);
                    }
                });

                return new ResponseEntity<>(new ProductDto(saveProductResponse, imageNames, saveProductResponse.getCategory()), HttpStatus.CREATED);
            }
            throw new NoResultException("Create category failed.");
        } catch (Exception ex) {
            throw new NoResultException(ex.getMessage());
        }
    }

    private Image handleUploadImage(MultipartFile multipartFile) throws IOException {
        String fileName = UUID.randomUUID() + "-" + ConvertStringToSlug.WHITESPACE.matcher(StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()))).replaceAll("-");
        Files.copy(multipartFile.getInputStream(), Paths.get("upload/images").resolve(fileName));

        Image imageData = new Image(fileName);
        Image imageUploadResponse = imageRepository.save(imageData);

        if (imageUploadResponse.getImageId() != 0) {
            return imageUploadResponse;
        }

        return null;
    }
}
