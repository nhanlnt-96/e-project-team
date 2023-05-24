package com.main.api.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CheckoutModel {
    public static class CreateOrder {
        @NotNull(message = "paymentMethod can not be null.")
        @Min(value = 0, message = "paymentMethod invalid")
        @Max(value = 1, message = "paymentMethod invalid")
        private Integer paymentMethod;
        @NotEmpty(message = "shippingAddress can not be null.")
        private String shippingAddress;
        @NotEmpty(message = "receiverName can not be null.")
        private String receiverName;
        @NotEmpty(message = "receiverPhone can not be null.")
        private String receiverPhone;

        public CreateOrder() {
        }

        public CreateOrder(Integer paymentMethod, String shippingAddress, String receiverName, String receiverPhone) {
            this.paymentMethod = paymentMethod;
            this.shippingAddress = shippingAddress;
            this.receiverName = receiverName;
            this.receiverPhone = receiverPhone;
        }

        public Integer getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(Integer paymentMethod) {
            this.paymentMethod = paymentMethod;
        }

        public String getShippingAddress() {
            return shippingAddress;
        }

        public void setShippingAddress(String shippingAddress) {
            this.shippingAddress = shippingAddress;
        }

        public String getReceiverName() {
            return receiverName;
        }

        public void setReceiverName(String receiverName) {
            this.receiverName = receiverName;
        }

        public String getReceiverPhone() {
            return receiverPhone;
        }

        public void setReceiverPhone(String receiverPhone) {
            this.receiverPhone = receiverPhone;
        }
    }
}
