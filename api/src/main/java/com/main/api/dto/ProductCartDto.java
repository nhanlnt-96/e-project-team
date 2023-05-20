package com.main.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductCartDto {
    private Long productId;
    private String description;
    private String productName;
    private List<ProductImageDto> images;
    private ProductCategoryDto category;
    private NetWeightDto netWeightDto;
    private ProductQuantityDto productQuantityDto;
    private int quantity;

    public ProductCartDto(Long productId, String description, String productName, List<ProductImageDto> images, ProductCategoryDto category, NetWeightDto netWeightDto, ProductQuantityDto productQuantityDto, int quantity) {
        this.productId = productId;
        this.description = description;
        this.productName = productName;
        this.images = images;
        this.category = category;
        this.netWeightDto = netWeightDto;
        this.productQuantityDto = productQuantityDto;
        this.quantity = quantity;
    }
}
