package com.main.api.dao;

import com.main.api.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findByNewsTitle(String newsTitle);
}
