package com.main.api.dto;

import com.main.api.entity.Product;
import com.main.api.entity.ProductCategory;

import java.util.List;

public class ProductDto {
    private Long productId;
    private String description;
    private Integer productPrice;
    private String productName;
    private List<String> imageNames;
    private ProductCategoryDto productCategoryDto;

    public ProductDto() {
    }

    public ProductDto(Product product, List<String> imageNames, ProductCategory productCategory) {
        this.productId = product.getProductId();
        this.description = product.getDescription();
        this.productPrice = product.getProductPrice();
        this.productName = product.getProductName();
        this.imageNames = imageNames;
        this.productCategoryDto = new ProductCategoryDto(productCategory);
    }
}
