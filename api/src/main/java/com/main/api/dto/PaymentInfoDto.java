package com.main.api.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PaymentInfoDto {
    private Long id;
    private Long orderId;
    private String paymentId;
    private Date paymentCreated;
    private String payeeName;
    private String payeeEmail;
    private String paymentCaptureId;

    public PaymentInfoDto() {
    }

    public PaymentInfoDto(Long id, Long orderId, String paymentId, Date paymentCreated, String payeeName, String payeeEmail, String paymentCaptureId) {
        this.id = id;
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.paymentCreated = paymentCreated;
        this.payeeName = payeeName;
        this.payeeEmail = payeeEmail;
        this.paymentCaptureId = paymentCaptureId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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
