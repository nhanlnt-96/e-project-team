package com.main.api.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

        public RegisterData() {
        }

        public RegisterData(String addressDetail, String phoneNumber, String email, String password, String confirmPassword, String fullName) {
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.password = password;
            this.confirmPassword = confirmPassword;
            this.fullName = fullName;
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

        public CreateNewAccount() {
        }

        public CreateNewAccount(Long roleId, String addressDetail, String phoneNumber, String email, String password, String fullName) {
            this.roleId = roleId;
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.password = password;
            this.fullName = fullName;
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
    }

    public static class UpdateAccount {
        @NotNull(message = "User id can not be null.")
        private Long userId;
        private String addressDetail;
        private String phoneNumber;
        private String fullName;

        public UpdateAccount() {
        }

        public UpdateAccount(Long userId, String addressDetail, String phoneNumber, String fullName) {
            this.userId = userId;
            this.addressDetail = addressDetail;
            this.phoneNumber = phoneNumber;
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

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }
    }
}
