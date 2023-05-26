package com.main.api.dto;

import com.main.api.entity.NetWeight;
import com.main.api.entity.Order;
import com.main.api.entity.Product;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
public class OrderItemDto {
    private Long id;
    private Integer quantity;
    private Double price;
    private String productName;
    private Long productId;
    private String netWeightLabel;
    private ProductCategoryDto productCategoryDto;

    public OrderItemDto() {
    }

    public OrderItemDto(Long id, Integer quantity, Double price, String productName, String netWeightLabel, ProductCategoryDto productCategoryDto, Long productId) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.productName = productName;
        this.netWeightLabel = netWeightLabel;
        this.productCategoryDto = productCategoryDto;
        this.productId = productId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getNetWeightLabel() {
        return netWeightLabel;
    }

    public void setNetWeightLabel(String netWeightLabel) {
        this.netWeightLabel = netWeightLabel;
    }

    public ProductCategoryDto getProductCategoryDto() {
        return productCategoryDto;
    }

    public void setProductCategoryDto(ProductCategoryDto productCategoryDto) {
        this.productCategoryDto = productCategoryDto;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
