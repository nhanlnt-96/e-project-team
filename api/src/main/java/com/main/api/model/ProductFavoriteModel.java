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

    public static class GetUserProductFavorite {
        @NotNull(message = "userId can not be null.")
        private Long userId;

        public GetUserProductFavorite() {
        }

        public GetUserProductFavorite(Long userId) {
            this.userId = userId;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
}
