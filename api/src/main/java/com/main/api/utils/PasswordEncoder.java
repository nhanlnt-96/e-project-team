package com.main.api.utils;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class PasswordEncoder {
    public static String hashPassword(String password) {
        return BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }

    public static Boolean verifyPassword(String hashPassword, String password) {
        return BCrypt.verifyer().verify(password.toCharArray(), hashPassword).verified;
    }
}
