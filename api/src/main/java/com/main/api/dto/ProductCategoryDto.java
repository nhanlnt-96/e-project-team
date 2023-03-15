package com.main.api.dto;

import com.main.api.entity.ProductCategory;
import lombok.Data;

@Data
public class ProductCategoryDto {
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
    private String categoryImageName;
    private String storageName;
    private String categoryDescription;

    public ProductCategoryDto() {
    }

    public ProductCategoryDto(ProductCategory productCategory) {
        this.categoryId = productCategory.getCategoryId();
        this.categoryName = productCategory.getCategoryName();
        this.categorySlug = productCategory.getCategorySlug();
        this.categoryImageName = productCategory.getCategoryImageName();
        this.storageName = productCategory.getStorageName();
        this.categoryDescription = productCategory.getCategoryDescription();
    }
}
