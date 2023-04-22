package com.main.api.dao;

import com.main.api.entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {
    ProductQuantity findProductQuantityByQuantityId(Long quantityId);

    List<ProductQuantity> findAllByProductProductId(Long productId);
}
