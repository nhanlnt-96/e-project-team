package com.main.api.dao;

import com.main.api.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByPaypalOrderId(String paypalOrderId);
}
