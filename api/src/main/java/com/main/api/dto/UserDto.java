package com.main.api.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String username;
    private int role;
    private Boolean status;
    private UserInfoDto userInfo;

    public UserDto() {
    }

    public UserDto(Long userId, String username, int role, Boolean status, UserInfoDto userInfo) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.status = status;
        this.userInfo = userInfo;
    }
}
