package com.main.api.dao;

import com.main.api.entity.StoreInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreInfoRepository extends JpaRepository<StoreInfo, Long> {
    StoreInfo findByStoreName(String storeName);
}
