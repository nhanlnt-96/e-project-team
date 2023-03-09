package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.dao.ImageRepository;
import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dao.ProductRepository;
import com.main.api.dto.ImageDto;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductController {
    private final ProductRepository productRepository;
    private final Validator validator;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository imageRepository;

    @Autowired

    public ProductController(ProductRepository productRepository, Validator validator, ProductCategoryRepository productCategoryRepository, ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.validator = validator;
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
                List<ImageDto> images = new ArrayList<>();
                Arrays.stream(productImages).forEach(image -> {
                    Image uploadImageResponse = null;
                    try {
                        uploadImageResponse = handleUploadImage(image, saveProductResponse);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    if (uploadImageResponse != null) {
                        images.add(new ImageDto(uploadImageResponse.getImageId(), uploadImageResponse.getImageName()));
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
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product,
                handleGenerateImageDto(product.getImages()),
                product.getCategory())).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    private List<ImageDto> handleGenerateImageDto(Set<Image> images) {
        List<ImageDto> imageDto = new ArrayList<>();
        for (Image image : images) {
            imageDto.add(new ImageDto(image.getImageId(), image.getImageName()));
        }

        return imageDto;
    }

    private Image handleUploadImage(MultipartFile multipartFile, Product product) throws IOException {
        String fileName = UUID.randomUUID() + "-" + ConvertStringToSlug.WHITESPACE.matcher(StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()))).replaceAll("-");
        Files.copy(multipartFile.getInputStream(), Paths.get("upload/images").resolve(fileName));

        Image imageData = new Image(fileName, product);
        Image imageUploadResponse = imageRepository.save(imageData);

        if (imageUploadResponse.getImageId() != 0) {
            return imageUploadResponse;
        }

        return null;
    }
}
