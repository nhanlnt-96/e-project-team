package com.main.api.specification;

import com.main.api.entity.Product;
import com.main.api.entity.ProductCategory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;

public class ProductSpecification {
    public static Specification<Product> searchByName(String productName) {
        return ((root, query, criteriaBuilder) -> productName.equals("all") ? criteriaBuilder.conjunction() : criteriaBuilder.like(root.get("productName"), "%" + productName + "%"));
    }

    public static Specification<Product> filterByCategorySlug(String categorySlug) {
        return ((root, query, criteriaBuilder) -> {
            Join<Product, ProductCategory> productCategoryJoin = root.join("category");
            Predicate predicate = criteriaBuilder.equal(productCategoryJoin.get("categorySlug"), categorySlug);

            return criteriaBuilder.or(predicate);
        });
    }
}
