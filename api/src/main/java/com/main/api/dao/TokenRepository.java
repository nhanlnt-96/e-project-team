package com.main.api.dao;

import com.main.api.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByUser_UserId_AndTokenName(Long userId, String tokenName);

    Optional<Token> findByTokenValue(String tokenValue);

    @Transactional
    void deleteById(long id);
}
