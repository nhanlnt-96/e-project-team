package com.main.api.dao;

import com.main.api.entity.StoreOpenHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreOpenHourRepository extends JpaRepository<StoreOpenHour, Long> {
    StoreOpenHour findByIdAndStoreInfoId(Long id, Long storeId);
}
