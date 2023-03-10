package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dto.ProductCategoryDto;
import com.main.api.entity.ProductCategory;
import com.main.api.model.CategoryModel;
import com.main.api.utils.ConvertStringToSlug;
import com.main.api.utils.FileManage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductCategoryController {
    private final ProductCategoryRepository productCategoryRepository;
    private final Validator validator;
    private static final String storageName = "categories";

    @Autowired
    public ProductCategoryController(ProductCategoryRepository productCategoryRepository, Validator validator) {
        this.productCategoryRepository = productCategoryRepository;
        this.validator = validator;
    }

    @PostMapping("/create-category")
    public ResponseEntity<ProductCategoryDto> createProductCategory(@RequestParam("createProductCategory") String createProductCategory, @RequestParam("categoryImage") MultipartFile categoryImage) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        CategoryModel.CreateProductCategory productCategoryData = mapper.readValue(createProductCategory, CategoryModel.CreateProductCategory.class);
        Set<ConstraintViolation<CategoryModel.CreateProductCategory>> constraintViolations = validator.validate(productCategoryData);

        if (!constraintViolations.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolations.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }

        ProductCategory productCategoryDto = getCategoryByName(productCategoryData.getCategoryName());
        if (productCategoryDto == null) {
            String fileName = FileManage.handleUploadImage(storageName, categoryImage);
            ProductCategory productCategory = new ProductCategory(productCategoryData.getCategoryName(), fileName, storageName);
            ProductCategory saveProductCategoryResponse = productCategoryRepository.save(productCategory);
            if (saveProductCategoryResponse.getCategoryId() != 0) {
                return new ResponseEntity<>(generateCategoryData(saveProductCategoryResponse), HttpStatus.CREATED);
            }
            throw new NoResultException("Create category failed.");
        } else {
            throw new NoResultException("Category name is exist.");
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductCategoryDto>> getAllProductCategory() {
        List<ProductCategory> productCategories = productCategoryRepository.findAll();
        List<ProductCategoryDto> productCategoryDtos = productCategories.stream().map(ProductCategoryDto::new).collect(Collectors.toList());
        return new ResponseEntity<>(productCategoryDtos, HttpStatus.OK);
    }

    @PutMapping("/update-category")
    public ResponseEntity<ProductCategoryDto> updateProductCategory(@RequestParam("categoryImage") MultipartFile categoryImage, @RequestParam("categoryUpdateData") String categoryUpdateData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        CategoryModel.UpdateProductCategory productCategoryData = mapper.readValue(categoryUpdateData, CategoryModel.UpdateProductCategory.class);
        Set<ConstraintViolation<CategoryModel.UpdateProductCategory>> constraintViolations = validator.validate(productCategoryData);

        if (!constraintViolations.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolations.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }

        ProductCategory checkCategoryExist = getCategoryById(productCategoryData.getCategoryId());
        if (checkCategoryExist == null) {
            throw new NoResultException("Category does not exist.");
        } else {
            if (productCategoryData.getCategoryName() != null) {
                if (checkCategoryExist.getCategoryName().equals(productCategoryData.getCategoryName()) || productCategoryData.getCategoryName() == null) {
                    return new ResponseEntity<>(generateCategoryData(checkCategoryExist), HttpStatus.OK);
                } else {
                    checkCategoryExist.setCategoryName(productCategoryData.getCategoryName());
                    checkCategoryExist.setCategorySlug(ConvertStringToSlug.convertCategoryNameToSlug(productCategoryData.getCategoryName()));
                }
            }
            if (categoryImage.getOriginalFilename() != null) {
                FileManage.handleRemoveImage(checkCategoryExist.getStorageName(), checkCategoryExist.getCategoryImageName());
                String fileName = FileManage.handleUploadImage(storageName, categoryImage);
                checkCategoryExist.setCategoryImageName(fileName);
            }

            ProductCategory updateProductCategoryResponse = productCategoryRepository.saveAndFlush(checkCategoryExist);
            return new ResponseEntity<>(generateCategoryData(updateProductCategoryResponse), HttpStatus.OK);
        }
    }

    @DeleteMapping("/remove-category/{categoryId}")
    public ResponseEntity<String> removeProductCategory(@PathVariable("categoryId") Long categoryId) throws IOException {
        ProductCategory checkCategoryExist = getCategoryById(categoryId);
        if (checkCategoryExist == null) {
            throw new NoResultException("Category does not exist.");
        } else {
            FileManage.handleRemoveImage(checkCategoryExist.getStorageName(), checkCategoryExist.getCategoryImageName());
            productCategoryRepository.delete(checkCategoryExist);
            return new ResponseEntity<>("Removed category.", HttpStatus.OK);
        }
    }


    private ProductCategory getCategoryByName(String categoryName) {
        return productCategoryRepository.getProductCategoryByCategoryName(categoryName);
    }

    private ProductCategory getCategoryById(Long categoryId) {
        try {
            ProductCategory productCategory = productCategoryRepository.findById(categoryId).get();
            if (productCategory.getCategoryId() != null) {
                return productCategory;
            } else {
                return null;
            }
        } catch (Exception exception) {
            return null;
        }
    }

    private ProductCategoryDto generateCategoryData(ProductCategory productCategory) {
        return new ProductCategoryDto(productCategory);
    }
}
