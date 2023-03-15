package com.main.api.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CategoryModel {
    public static class CreateProductCategory {
        @NotEmpty(message = "categoryName can not be null.")
        private String categoryName;
        @NotEmpty(message = "categoryDescription can not be null.")
        private String categoryDescription;

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

        public String getCategoryDescription() {
            return categoryDescription;
        }

        public void setCategoryDescription(String categoryDescription) {
            this.categoryDescription = categoryDescription;
        }
    }

    public static class UpdateProductCategory {
        @NotNull(message = "categoryId can not be null.")
        private Long categoryId;
        private String categoryName;
        private String categoryDescription;

        public UpdateProductCategory() {
        }

        public UpdateProductCategory(Long categoryId, String categoryName, String categoryDescription) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.categoryDescription = categoryDescription;
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

        public String getCategoryDescription() {
            return categoryDescription;
        }

        public void setCategoryDescription(String categoryDescription) {
            this.categoryDescription = categoryDescription;
        }
    }
}
