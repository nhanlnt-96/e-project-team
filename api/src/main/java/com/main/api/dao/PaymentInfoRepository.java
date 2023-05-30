package com.main.api.dao;

import com.main.api.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long> {
    PaymentInfo findAllByOrder_Id(Long orderId);
}
