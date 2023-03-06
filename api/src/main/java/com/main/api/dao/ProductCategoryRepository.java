package com.main.api.dao;

import com.main.api.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    ProductCategory getProductCategoryByCategoryName(String categoryName);
}
