package com.main.api.dto;

import lombok.Data;

@Data
public class AuthDto {
    private String email;
    private String accessToken;

    public AuthDto() {
    }

    public AuthDto(String email, String accessToken) {
        this.email = email;
        this.accessToken = accessToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
