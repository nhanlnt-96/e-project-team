package com.main.api.constant;

public class Constant {
    public static String ADMIN_ROLE = "ROLE_ADMIN";
    public static String USER_ROLE = "ROLE_USER";
    public static int FEMALE_GENDER = 0;
    public static int MALE_GENDER = 1;
    public static Integer NOT_VERIFY_EMAIL = 0;
    public static Integer VERIFIED_EMAIL = 1;
    public static String CHANGE_PASSWORD_TOKEN_NAME = "change-password";
    public static String VERIFY_EMAIL_TOKEN_NAME = "verify-email";
    public static Integer SHIPPING_STATUS_DELIVERED = 0;
    public static Integer SHIPPING_STATUS_SHIPPING = 1;
    public static Integer SHIPPING_STATUS_CANCEL = 2;
    public static Integer PAYMENT_METHOD_COD = 0;
    public static Integer PAYMENT_METHOD_PAYPAL = 1;
    public static Integer PAYMENT_STATUS_PAID = 0;
    public static Integer PAYMENT_STATUS_PENDING = 1;
    public static Integer IS_ABOUT_US_NEWS = 1;
    public static Integer IS_NEWS = 0;

    public enum DayOfWeek {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
}
