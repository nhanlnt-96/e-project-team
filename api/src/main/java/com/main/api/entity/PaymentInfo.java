package com.main.api.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment_info")
@Getter
@Setter
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "payment_id")
    private String paymentId;
    @Column(name = "payment_created")
    private Date paymentCreated;
    @Column(name = "payee_name")
    private String payeeName;
    @Column(name = "payee_email")
    private String payeeEmail;
    @Column(name = "payment_capture_id")
    private String paymentCaptureId;
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "order_id")
    private Order order;

    public PaymentInfo() {
    }

    public PaymentInfo(String paymentId, Date paymentCreated, String payeeName, String payeeEmail, String paymentCaptureId, Order order) {
        this.paymentId = paymentId;
        this.paymentCreated = paymentCreated;
        this.payeeName = payeeName;
        this.payeeEmail = payeeEmail;
        this.paymentCaptureId = paymentCaptureId;
        this.order = order;
    }
}
