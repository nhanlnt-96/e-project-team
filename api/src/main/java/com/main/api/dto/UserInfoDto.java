package com.main.api.dto;

import com.main.api.entity.UserInfo;
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

    public UserInfoDto(UserInfo userInfo) {
        this.userId = userInfo.getUserId();
        this.address = userInfo.getAddress();
        this.fullName = userInfo.getFullName();
        this.phoneNumber = userInfo.getPhoneNumber();
        this.dob = userInfo.getDob();
        this.gender = userInfo.getGender();
    }
}
