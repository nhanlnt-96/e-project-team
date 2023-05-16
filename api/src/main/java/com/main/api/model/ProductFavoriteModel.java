package com.main.api.model;

import javax.validation.constraints.NotNull;

public class ProductFavoriteModel {
    public static class AddProductFavorite {
        @NotNull(message = "productId can not be null.")
        private Long productId;

        public AddProductFavorite() {
        }

        public AddProductFavorite(Long productId) {
            this.productId = productId;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }
    }
}
