package com.main.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductFavoriteDto {
    private Long userId;
    private List<ProductDto> productDtoList;

    public ProductFavoriteDto() {
    }

    public ProductFavoriteDto(Long userId, List<ProductDto> productDtoList) {
        this.userId = userId;
        this.productDtoList = productDtoList;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<ProductDto> getProductDtoList() {
        return productDtoList;
    }

    public void setProductDtoList(List<ProductDto> productDtoList) {
        this.productDtoList = productDtoList;
    }
}
