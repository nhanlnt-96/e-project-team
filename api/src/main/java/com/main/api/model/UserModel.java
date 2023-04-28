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
}
