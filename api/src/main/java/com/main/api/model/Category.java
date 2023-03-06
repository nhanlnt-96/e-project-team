package com.main.api.model;

import javax.validation.constraints.NotEmpty;

public class Category {
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
}
