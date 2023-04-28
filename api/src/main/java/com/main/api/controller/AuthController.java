package com.main.api.controller;

import com.main.api.dao.UserRepository;
import com.main.api.dto.AuthDto;
import com.main.api.entity.User;
import com.main.api.jwt.JwtTokenUtil;
import com.main.api.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class AuthController {
    final private AuthenticationManager authManager;
    final private JwtTokenUtil jwtUtil;
    final private UserRepository userRepository;

    public AuthController(AuthenticationManager authManager, JwtTokenUtil jwtUtil, UserRepository userRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(@RequestBody @Valid UserModel.LoginData loginData) {
        try {
            User userData = userRepository.findByEmail(loginData.getEmail()).orElse(null);
            if (userData == null) {
                throw new NoResultException("Email or password incorrect.");
            }
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.getEmail(), loginData.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthDto response = new AuthDto(user.getEmail(), accessToken);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadCredentialsException ex) {
            System.out.println(ex);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
