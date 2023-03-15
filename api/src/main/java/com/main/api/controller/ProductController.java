package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.dao.ImageRepository;
import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dao.ProductRepository;
import com.main.api.dto.ProductImageDto;
import com.main.api.dto.ProductDto;
import com.main.api.entity.*;
import com.main.api.model.ProductModel;
import com.main.api.specification.ProductSpecification;
import com.main.api.utils.FileManage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductController {
    private final ProductRepository productRepository;
    private final Validator validator;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository productImageRepository;
    private static final String storageName = "products";

    @Autowired

    public ProductController(ProductRepository productRepository, Validator validator, ProductCategoryRepository productCategoryRepository, ImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.validator = validator;
        this.productCategoryRepository = productCategoryRepository;
        this.productImageRepository = productImageRepository;
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
                List<ProductImageDto> images = new ArrayList<>();
                Arrays.stream(productImages).forEach(image -> {
                    ProductImage uploadProductImageResponse = null;
                    try {
                        uploadProductImageResponse = handleUploadImage(image, saveProductResponse);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    if (uploadProductImageResponse != null) {
                        images.add(new ProductImageDto(uploadProductImageResponse.getImageId(), uploadProductImageResponse.getImageName(), uploadProductImageResponse.getStorageName()));
                    }
                });

                return new ResponseEntity<>(new ProductDto(saveProductResponse, images, saveProductResponse.getCategory()), HttpStatus.CREATED);
            }
            throw new NoResultException("Create category failed.");
        } catch (Exception ex) {
            throw new NoResultException(ex.getMessage());
        }
    }

    @GetMapping("/get-all-product")
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        List<Product> productList = productRepository.findAll();
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory())).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @GetMapping("/product-search")
    public ResponseEntity<List<ProductDto>> getProductByCategory(@RequestParam(value = "categorySlug",
            defaultValue = "all") String categorySlug) {
        List<Product> productList =
                productRepository.findAll(Specification.where(ProductSpecification.filterByCategorySlug(categorySlug)));
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory())).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    private List<ProductImageDto> handleGenerateImageDto(Set<ProductImage> productImages) {
        List<ProductImageDto> productImageDto = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            productImageDto.add(new ProductImageDto(productImage.getImageId(), productImage.getImageName(), productImage.getStorageName()));
        }

        return productImageDto;
    }

    private ProductImage handleUploadImage(MultipartFile multipartFile, Product product) throws IOException {
        String fileName = FileManage.handleUploadImage(storageName, multipartFile);

        ProductImage productImageData = new ProductImage(fileName, storageName, product);
        ProductImage productImageUploadResponse = productImageRepository.save(productImageData);

        if (productImageUploadResponse.getImageId() != 0) {
            return productImageUploadResponse;
        }

        return null;
    }
}
