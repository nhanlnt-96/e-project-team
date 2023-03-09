package com.main.api.dto;

import lombok.Data;

@Data
public class ImageDto {
    private Long imageId;
    private String imageName;

    public ImageDto() {
    }

    public ImageDto(Long imageId, String imageName) {
        this.imageId = imageId;
        this.imageName = imageName;
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
}
