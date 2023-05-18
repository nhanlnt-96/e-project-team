package com.main.api.dao;

import com.main.api.entity.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {
    ProductQuantity findProductQuantityByQuantityId(Long quantityId);

    List<ProductQuantity> findAllByProductProductId(Long productId);

    Optional<ProductQuantity> findProductQuantityByNetWeight_NetWeightIdAndProduct_ProductId(Long netWeightId, Long productId);
}
