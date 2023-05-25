package com.main.api.model;

import org.springframework.lang.Nullable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class CheckoutModel {
    public static class PaymentInfo {
        @NotEmpty(message = "paymentId can not be null.")
        private String paymentId;
        @NotEmpty(message = "paymentCreated can not be null.")
        private Date paymentCreated;
        @NotEmpty(message = "payeeName can not be null.")
        private String payeeName;
        @NotEmpty(message = "payeeEmail can not be null.")
        private String payeeEmail;
        @NotEmpty(message = "paymentCaptureId can not be null.")
        private String paymentCaptureId;

        public PaymentInfo() {
        }

        public PaymentInfo(String paymentId, Date paymentCreated, String payeeName, String payeeEmail, String paymentCaptureId) {
            this.paymentId = paymentId;
            this.paymentCreated = paymentCreated;
            this.payeeName = payeeName;
            this.payeeEmail = payeeEmail;
            this.paymentCaptureId = paymentCaptureId;
        }

        public String getPaymentId() {
            return paymentId;
        }

        public void setPaymentId(String paymentId) {
            this.paymentId = paymentId;
        }

        public Date getPaymentCreated() {
            return paymentCreated;
        }

        public void setPaymentCreated(Date paymentCreated) {
            this.paymentCreated = paymentCreated;
        }

        public String getPayeeName() {
            return payeeName;
        }

        public void setPayeeName(String payeeName) {
            this.payeeName = payeeName;
        }

        public String getPayeeEmail() {
            return payeeEmail;
        }

        public void setPayeeEmail(String payeeEmail) {
            this.payeeEmail = payeeEmail;
        }

        public String getPaymentCaptureId() {
            return paymentCaptureId;
        }

        public void setPaymentCaptureId(String paymentCaptureId) {
            this.paymentCaptureId = paymentCaptureId;
        }
    }

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
        @Nullable
        private CheckoutModel.PaymentInfo paymentInfo;

        public CreateOrder() {
        }

        public CreateOrder(Integer paymentMethod, String shippingAddress, String receiverName, String receiverPhone, @Nullable CheckoutModel.PaymentInfo paymentInfo) {
            this.paymentMethod = paymentMethod;
            this.shippingAddress = shippingAddress;
            this.receiverName = receiverName;
            this.receiverPhone = receiverPhone;
            this.paymentInfo = paymentInfo;
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

        @Nullable
        public PaymentInfo getPaymentInfo() {
            return paymentInfo;
        }

        public void setPaymentInfo(@Nullable PaymentInfo paymentInfo) {
            this.paymentInfo = paymentInfo;
        }
    }

    public static class UpdateShippingStatus {
        @NotNull(message = "orderId can not be null.")
        Long orderId;
        @NotNull(message = "shippingStatus can not be null.")
        @Min(value = 0, message = "shippingStatus invalid")
        @Max(value = 2, message = "shippingStatus invalid")
        private Integer shippingStatus;

        public UpdateShippingStatus() {
        }

        public UpdateShippingStatus(Long orderId, Integer shippingStatus) {
            this.orderId = orderId;
            this.shippingStatus = shippingStatus;
        }

        public Long getOrderId() {
            return orderId;
        }

        public void setOrderId(Long orderId) {
            this.orderId = orderId;
        }

        public Integer getShippingStatus() {
            return shippingStatus;
        }

        public void setShippingStatus(Integer shippingStatus) {
            this.shippingStatus = shippingStatus;
        }
    }
}
