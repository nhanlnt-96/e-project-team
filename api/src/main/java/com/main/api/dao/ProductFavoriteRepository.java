package com.main.api.dao;

import com.main.api.entity.ProductFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductFavoriteRepository extends JpaRepository<ProductFavorite, Long> {
    List<ProductFavorite> findByUser_UserId(Long userId);

    ProductFavorite findByUser_UserId_AndProduct_ProductId(Long userId, Long productId);

    ProductFavorite findByProduct_ProductId(Long productId);
}
