package com.main.api.controller;

import com.main.api.dao.ProductCategoryRepository;
import com.main.api.dto.HttpResponse;
import com.main.api.dto.ProductCategoryDto;
import com.main.api.entity.ProductCategory;
import com.main.api.model.Category;
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
    public ResponseEntity<ProductCategoryDto> createProductCategory(@Valid @RequestBody Category.CreateProductCategory createProductCategory) {
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
        List<ProductCategoryDto> productCategoryDtos = productCategories.stream().map(category -> new ProductCategoryDto(category.getCategoryId(), category.getCategoryName())).collect(Collectors.toList());
        return new ResponseEntity<>(productCategoryDtos, HttpStatus.OK);
    }

    private ProductCategory getCategoryByName(String categoryName) {
        return productCategoryRepository.getProductCategoryByCategoryName(categoryName);
    }

    private ProductCategoryDto generateCategoryData(ProductCategory productCategory) {
        return new ProductCategoryDto(productCategory.getCategoryId(), productCategory.getCategoryName());
    }
}
