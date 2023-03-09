package com.main.api.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CategoryModel {
    public static class CreateProductCategory {
        @NotEmpty(message = "categoryName can not be null.")
        private String categoryName;

        public CreateProductCategory() {
        }

        public CreateProductCategory(String categoryName) {
            this.categoryName = categoryName;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }
    }

    public static class UpdateProductCategory {
        @NotNull(message = "categoryId can not be null.")
        private Long categoryId;
        private String categoryName;

        public UpdateProductCategory() {
        }

        public UpdateProductCategory(Long categoryId, String categoryName) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
