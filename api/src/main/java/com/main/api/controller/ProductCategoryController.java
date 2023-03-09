package com.main.api.controller;

import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dto.ProductCategoryDto;
import com.main.api.entity.ProductCategory;
import com.main.api.model.CategoryModel;
import com.main.api.utils.ConvertStringToSlug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductCategoryController {
    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryController(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @PostMapping("/create-category")
    public ResponseEntity<ProductCategoryDto> createProductCategory(@Valid @RequestBody CategoryModel.CreateProductCategory createProductCategory) {
        ProductCategory productCategoryDto = getCategoryByName(createProductCategory.getCategoryName());
        if (productCategoryDto == null) {
            ProductCategory productCategory = new ProductCategory(createProductCategory.getCategoryName());
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
    public ResponseEntity<ProductCategoryDto> updateProductCategory(@Valid @RequestBody CategoryModel.UpdateProductCategory updateProductCategory) {
        ProductCategory checkCategoryExist = getCategoryById(updateProductCategory.getCategoryId());
        if (checkCategoryExist == null) {
            throw new NoResultException("Category does not exist.");
        } else {
            if (checkCategoryExist.getCategoryName().equals(updateProductCategory.getCategoryName()) || updateProductCategory.getCategoryName() == null) {
                return new ResponseEntity<>(generateCategoryData(checkCategoryExist), HttpStatus.OK);
            } else {
                checkCategoryExist.setCategoryName(updateProductCategory.getCategoryName());
                checkCategoryExist.setCategorySlug(ConvertStringToSlug.convertCategoryNameToSlug(updateProductCategory.getCategoryName()));
                ProductCategory updateProductCategoryResponse = productCategoryRepository.saveAndFlush(checkCategoryExist);
                return new ResponseEntity<>(generateCategoryData(updateProductCategoryResponse), HttpStatus.OK);
            }
        }
    }

    @DeleteMapping("/remove-category/{categoryId}")
    public ResponseEntity<String> removeProductCategory(@PathVariable("categoryId") Long categoryId) {
        ProductCategory checkCategoryExist = getCategoryById(categoryId);
        if (checkCategoryExist == null) {
            throw new NoResultException("Category does not exist.");
        } else {
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
