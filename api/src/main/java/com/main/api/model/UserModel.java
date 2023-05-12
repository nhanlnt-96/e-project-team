package com.main.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Date;

public class UserModel {
    public static class RegisterData {
        private String addressDetail;
        @NotNull(message = "phoneNumber can not be null")
        private String phoneNumber;
        @NotNull(message = "email can not be null")
        @Email(message = "email invalid")
        private String email;
        @NotNull(message = "password can not be null")
        private String password;
        @NotNull(message = "confirmPassword can not be null")
        private String confirmPassword;
        @NotNull(message = "fullName can not be null")
        private String fullName;
        @NotNull(message = "gender can not be null")
        private Integer gender;
        @NotNull(message = "dob can not be null")
        private LocalDate dob;

        public RegisterData() {
        }

        public RegisterData(String addressDetail, String phoneNumber, String email, String password, String confirmPassword, String fullName, Integer gender, LocalDate dob) {
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.password = password;
            this.confirmPassword = confirmPassword;
            this.fullName = fullName;
            this.gender = gender;
            this.dob = dob;
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

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
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
    }

    public static class LoginData {
        @NotEmpty(message = "email can not be null.")
        @Email(message = "email invalid")
        private String email;
        @NotEmpty(message = "password can not be null.")
        private String password;

        public LoginData() {
        }

        public LoginData(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class CreateNewAccount {
        private Long roleId;
        private String addressDetail;
        @NotNull(message = "phoneNumber can not be null")
        private String phoneNumber;
        @NotNull(message = "email can not be null")
        @Email(message = "email invalid")
        private String email;
        @NotNull(message = "password can not be null")
        private String password;
        @NotNull(message = "fullName can not be null")
        private String fullName;
        @NotNull(message = "gender can not be null")
        private Integer gender;
        @NotNull(message = "dob can not be null")
        private LocalDate dob;

        public CreateNewAccount() {
        }

        public CreateNewAccount(Long roleId, String addressDetail, String phoneNumber, String email, String password, String fullName, Integer gender, LocalDate dob) {
            this.roleId = roleId;
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.password = password;
            this.fullName = fullName;
            this.gender = gender;
            this.dob = dob;
        }

        public Long getRoleId() {
            return roleId;
        }

        public void setRoleId(Long roleId) {
            this.roleId = roleId;
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

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
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
    }

    public static class UpdateAccount {
        @NotNull(message = "User id can not be null.")
        private Long userId;
        private String addressDetail;
        private String phoneNumber;
        private String fullName;
        private Integer gender;
        private LocalDate dob;

        public UpdateAccount() {
        }

        public UpdateAccount(Long userId, String addressDetail, String phoneNumber, String fullName, Integer gender, LocalDate dob) {
            this.userId = userId;
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
            this.fullName = fullName;
            this.gender = gender;
            this.dob = dob;
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

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
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
    }

    public static class GetResetPasswordToken {
        @NotEmpty(message = "email can not be null")
        @Email(message = "email invalid")
        String email;

        public GetResetPasswordToken() {
        }

        public GetResetPasswordToken(String email) {
            this.email = email;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    public static class ResetPassword {
        @NotEmpty(message = "token can not be null")
        String token;
        @NotEmpty(message = "password can not be null")
        String password;
        @NotEmpty(message = "confirmPassword can not be null")
        String confirmPassword;

        public ResetPassword() {
        }

        public ResetPassword(String token, String password, String confirmPassword) {
            this.token = token;
            this.password = password;
            this.confirmPassword = confirmPassword;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }

    public static class VerifyEmail {
        @NotEmpty(message = "token can not be null")
        String token;

        public VerifyEmail() {
        }

        public VerifyEmail(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    public static class ChangePassword {
        @NotEmpty(message = "oldPassword can not be null")
        String oldPassword;
        @NotEmpty(message = "password can not be null")
        String password;
        @NotEmpty(message = "confirmPassword can not be null")
        String confirmPassword;

        public ChangePassword() {
        }

        public ChangePassword(String oldPassword, String password, String confirmPassword) {
            this.oldPassword = oldPassword;
            this.password = password;
            this.confirmPassword = confirmPassword;
        }

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }
}
