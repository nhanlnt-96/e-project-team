package com.main.api.dto;

import com.main.api.entity.Product;
import com.main.api.entity.ProductCategory;
import lombok.Data;

import java.util.List;

@Data
public class ProductDto {
    private Long productId;
    private String description;
    private String productName;
    private List<ProductImageDto> images;
    private ProductCategoryDto category;
    private List<ProductQuantityDto> productQuantityDtoList;

    public ProductDto() {
    }

    public ProductDto(Product product, List<ProductImageDto> images, ProductCategory productCategory, List<ProductQuantityDto> productQuantityDtoList) {
        this.productId = product.getProductId();
        this.description = product.getDescription();
        this.productName = product.getProductName();
        this.images = images;
        this.category = new ProductCategoryDto(productCategory);
        this.productQuantityDtoList = productQuantityDtoList;
    }
}
