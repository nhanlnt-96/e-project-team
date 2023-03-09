package com.main.api.model;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ProductModel {
    public static class CreateProduct {
        @NotEmpty(message = "description can not be null.")
        private String description;
        @NotEmpty(message = "productName can not be null.")
        private String productName;
        @NotNull(message = "productPrice can not be null.")
        private Integer productPrice;
        @NotNull(message = "categoryId can not be null.")
        private Long categoryId;

        public CreateProduct() {
        }

        public CreateProduct(String description, String productName, Integer productPrice, Long categoryId) {
            this.description = description;
            this.productName = productName;
            this.productPrice = productPrice;
            this.categoryId = categoryId;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public Integer getProductPrice() {
            return productPrice;
        }

        public void setProductPrice(Integer productPrice) {
            this.productPrice = productPrice;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
