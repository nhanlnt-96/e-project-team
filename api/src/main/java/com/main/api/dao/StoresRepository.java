package com.main.api.dao;

import com.main.api.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoresRepository extends JpaRepository<Store, Long> {
}
