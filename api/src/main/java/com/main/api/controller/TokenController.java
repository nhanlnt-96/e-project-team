package com.main.api.controller;

import com.main.api.dao.TokenRepository;
import com.main.api.entity.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/token")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class TokenController {
    final private TokenRepository tokenRepository;

    public TokenController(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/check-token-exist/{token}")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Boolean> checkTokenExist(@Valid @PathVariable("token") String token) {
        Token checkTokenExist = tokenRepository.findByTokenValue(token).orElse(null);
        if (checkTokenExist != null) return new ResponseEntity<>(true, HttpStatus.OK);
        else return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}
