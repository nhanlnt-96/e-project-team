package com.main.api.dto;

import lombok.Data;

@Data
public class ProductCategoryDto {
    private Long categoryId;
    private String categoryName;
    private String categorySlug;

    public ProductCategoryDto() {
    }

    public ProductCategoryDto(Long categoryId, String categoryName, String categorySlug) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categorySlug = categorySlug;
    }
}
