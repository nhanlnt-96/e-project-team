package com.main.api.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UserInfoDto {
    private Long userId;
    private String address;
    private String fullName;
    private String phoneNumber;
    private Date dob;
    private int gender;

    public UserInfoDto() {
    }

    public UserInfoDto(Long userId, String address, String fullName, String phoneNumber, Date dob, int gender) {
        this.userId = userId;
        this.address = address;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
    }
}
