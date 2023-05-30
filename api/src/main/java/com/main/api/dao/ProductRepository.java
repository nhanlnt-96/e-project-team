package com.main.api.dao;

import com.main.api.entity.Product;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAll(Specification<Product> specification);

    //    @Query("SELECT p FROM Product p ORDER BY p.createdAt desc LIMIT 2")
    List<Product> findTop10ByOrderByCreatedAtDesc();
}
