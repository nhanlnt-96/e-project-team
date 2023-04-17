package com.main.api.dao;

import com.main.api.entity.NetWeight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NetWeightRepository extends JpaRepository<NetWeight, Long> {
    NetWeight findNetWeightByNetWeightLabel(String netWeightLabel);

    NetWeight findNetWeightByNetWeightValue(Integer netWeightValue);
}
