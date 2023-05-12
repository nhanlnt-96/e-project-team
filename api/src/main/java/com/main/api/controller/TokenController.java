package com.main.api.controller;

import com.main.api.dao.TokenRepository;
import com.main.api.entity.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api/token")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class TokenController {
    final static long millisecondsPerHour = 60 * 60 * 1000;
    final static long twoHoursInMil = 2 * millisecondsPerHour;
    final private TokenRepository tokenRepository;

    public TokenController(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/check-token-exist/{token}")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Boolean> checkTokenExist(@Valid @PathVariable("token") String token) {
        Token checkTokenExist = tokenRepository.findByTokenValue(token).orElse(null);
        if (checkTokenExist != null) {
            if (checkTokenExpired(checkTokenExist.getCreatedAt())) {
                tokenRepository.deleteById(checkTokenExist.getId());

                return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

    public static boolean checkTokenExpired(Date tokenCreated) {
        Date currentDate = new Date();
        return currentDate.getTime() - tokenCreated.getTime() < twoHoursInMil;
    }
}
