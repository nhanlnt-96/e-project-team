package com.main.api.dto;

import com.main.api.entity.Product;
import com.main.api.entity.ProductCategory;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private Long productId;
    private String description;
    private Integer productPrice;
    private String productName;
    private List<ProductImageDto> images;
    private ProductCategoryDto category;

    public ProductDto() {
    }

    public ProductDto(Product product, List<ProductImageDto> images, ProductCategory productCategory) {
        this.productId = product.getProductId();
        this.description = product.getDescription();
        this.productPrice = product.getProductPrice();
        this.productName = product.getProductName();
        this.images = images;
        this.category = new ProductCategoryDto(productCategory);
    }
}
