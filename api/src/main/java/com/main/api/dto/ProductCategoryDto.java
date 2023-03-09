package com.main.api.dto;

import com.main.api.entity.ProductCategory;
import lombok.Data;

@Data
public class ProductCategoryDto {
    private Long categoryId;
    private String categoryName;
    private String categorySlug;

    public ProductCategoryDto() {
    }

    public ProductCategoryDto(ProductCategory productCategory) {
        this.categoryId = productCategory.getCategoryId();
        this.categoryName = productCategory.getCategoryName();
        this.categorySlug = productCategory.getCategorySlug();
    }
}
