package com.main.api.dto;

import com.main.api.entity.NetWeight;
import lombok.Data;

@Data
public class ProductQuantityDto {
    private Long quantityId;
    private Integer quantity;
    private Double price;
    private NetWeightDto netWeightDto;

    public ProductQuantityDto() {
    }

    public ProductQuantityDto(Long quantityId, Integer quantity, Double price, NetWeight netWeight) {
        this.quantityId = quantityId;
        this.quantity = quantity;
        this.price = price;
        this.netWeightDto = new NetWeightDto(netWeight.getNetWeightId(), netWeight.getNetWeightLabel(), netWeight.getNetWeightValue());
    }

    public Long getQuantityId() {
        return quantityId;
    }

    public void setQuantityId(Long quantityId) {
        this.quantityId = quantityId;
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

    public NetWeightDto getNetWeightDto() {
        return netWeightDto;
    }

    public void setNetWeightDto(NetWeightDto netWeightDto) {
        this.netWeightDto = netWeightDto;
    }
}
