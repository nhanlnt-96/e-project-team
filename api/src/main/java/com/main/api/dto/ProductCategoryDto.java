package com.main.api.dto;

import lombok.Data;

@Data
public class ProductCategoryDto {
    private Long categoryId;
    private String categoryName;

    public ProductCategoryDto() {
    }

    public ProductCategoryDto(Long categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
