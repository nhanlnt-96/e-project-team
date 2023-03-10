package com.main.api.dto;

import lombok.Data;

@Data
public class ProductImageDto {
    private Long imageId;
    private String imageName;
    private String storageName;

    public ProductImageDto() {
    }

    public ProductImageDto(Long imageId, String imageName, String storageName) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.storageName = storageName;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }
}
