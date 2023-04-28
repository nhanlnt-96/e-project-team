package com.main.api.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String addressDetail;
    private String phoneNumber;
    private String email;
    private String fullName;

    public UserDto() {
    }

    public UserDto(Long userId, String addressDetail, String phoneNumber, String email, String fullName) {
        this.userId = userId;
        this.addressDetail = addressDetail;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.fullName = fullName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
