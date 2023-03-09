package com.main.api.model;

import javax.validation.constraints.NotEmpty;

public class UserModel {
    public static class RegisterData {
        @NotEmpty(message = "username can not be null.")
        private String username;
        @NotEmpty(message = "password can not be null.")
        private String password;
        @NotEmpty(message = "fullName can not be null.")
        private String fullName;

        public RegisterData() {
        }

        public RegisterData(String username, String password, String fullName) {
            this.username = username;
            this.password = password;
            this.fullName = fullName;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
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

    public static class LoginData {
        @NotEmpty(message = "username can not be null.")
        private String username;
        @NotEmpty(message = "password can not be null.")
        private String password;

        public LoginData() {
        }

        public LoginData(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
