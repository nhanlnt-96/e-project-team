package com.main.api.model;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class ProductModel {
    public static class ProductQuantityList {
        @NotNull(message = "netWeightId can not be null.")
        private Long netWeightId;
        @NotNull(message = "quantity can not be null.")
//        @Min(value = 1, message = "quantity can not be smaller than 1.")
        private Integer quantity;

        public ProductQuantityList() {
        }

        public ProductQuantityList(Long netWeightId, Integer quantity) {
            this.netWeightId = netWeightId;
            this.quantity = quantity;
        }

        public Long getNetWeightId() {
            return netWeightId;
        }

        public void setNetWeightId(Long netWeightId) {
            this.netWeightId = netWeightId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }

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

    public static class UpdateProduct {
        @NotNull(message = "productId can not be null.")
        private Long productId;
        private String description;
        private String productName;
        private Integer productPrice;
        private Long categoryId;

        public UpdateProduct() {
        }

        public UpdateProduct(Long productId, String description, String productName, Integer productPrice, Long categoryId) {
            this.productId = productId;
            this.description = description;
            this.productName = productName;
            this.productPrice = productPrice;
            this.categoryId = categoryId;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
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
