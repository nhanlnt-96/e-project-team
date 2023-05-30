package com.main.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class StoreInfoDto {
    private Long id;
    private String storeName;
    private String address;
    private String phoneNumber;
    private String storeImage;
    List<StoreOpenHourDto> storeOpenHourDtos;

    public StoreInfoDto() {
    }

    public StoreInfoDto(Long id, String storeName, String address, String phoneNumber, String storeImage, List<StoreOpenHourDto> storeOpenHourDtos) {
        this.id = id;
        this.storeName = storeName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.storeImage = storeImage;
        this.storeOpenHourDtos = storeOpenHourDtos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStoreImage() {
        return storeImage;
    }

    public void setStoreImage(String storeImage) {
        this.storeImage = storeImage;
    }

    public List<StoreOpenHourDto> getStoreOpenHourDtos() {
        return storeOpenHourDtos;
    }

    public void setStoreOpenHourDtos(List<StoreOpenHourDto> storeOpenHourDtos) {
        this.storeOpenHourDtos = storeOpenHourDtos;
    }
}
