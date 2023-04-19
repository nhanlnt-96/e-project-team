package com.main.api.dao;

import com.main.api.entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {
}
