package com.main.api.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class CartModel {
    public static class AddToCart {
        @NotNull(message = "netWeightId can not be null.")
        Long netWeightId;
        @NotNull(message = "productId can not be null.")
        Long productId;
        @NotNull(message = "quantity can not be null.")
        @Min(value = 1, message = "Quantity can not smaller than 1")
        int quantity;

        public AddToCart() {
        }

        public AddToCart(Long netWeightId, Long productId, int quantity) {
            this.netWeightId = netWeightId;
            this.productId = productId;
            this.quantity = quantity;
        }

        public Long getNetWeightId() {
            return netWeightId;
        }

        public void setNetWeightId(Long netWeightId) {
            this.netWeightId = netWeightId;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }

    public static class RemoveFromCart {
        @NotNull(message = "netWeightId can not be null.")
        Long netWeightId;
        @NotNull(message = "productId can not be null.")
        Long productId;

        public RemoveFromCart() {
        }

        public RemoveFromCart(Long netWeightId, Long productId) {
            this.netWeightId = netWeightId;
            this.productId = productId;
        }

        public Long getNetWeightId() {
            return netWeightId;
        }

        public void setNetWeightId(Long netWeightId) {
            this.netWeightId = netWeightId;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }
    }
}
