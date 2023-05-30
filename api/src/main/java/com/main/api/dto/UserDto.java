package com.main.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main.api.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long userId;
    private String addressDetail;
    private String phoneNumber;
    private String email;
    private String fullName;
    private Integer verifyEmail;
    private Integer gender;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "asia/ho_chi_minh")
    private LocalDate dob;
    private String role;

    public UserDto() {
    }

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.addressDetail = user.getAddressDetail();
        this.phoneNumber = user.getPhoneNumber();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.verifyEmail = user.getVerifyEmail();
        this.gender = user.getGender();
        this.dob = user.getDob();
        this.role = user.getRoles().toString();
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

    public Integer getVerifyEmail() {
        return verifyEmail;
    }

    public void setVerifyEmail(Integer verifyEmail) {
        this.verifyEmail = verifyEmail;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
