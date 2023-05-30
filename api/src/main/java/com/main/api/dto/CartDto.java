package com.main.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class CartDto {
    private Long id;
    private Long userId;
    private List<ProductCartDto> productCartDtoList;
}
