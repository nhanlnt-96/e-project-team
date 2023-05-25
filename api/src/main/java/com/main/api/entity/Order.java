package com.main.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.api.constant.Constant;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "shipping_status")
    private Integer shippingStatus;
    @Column(name = "payment_method")
    private Integer paymentMethod;
    @Column(name = "payment_status")
    private Integer paymentStatus;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @Column(name = "receiver_name")
    private String receiverName;
    @Column(name = "receiver_phone")
    private String receiverPhone;
    @Column(name = "created_at")
    private Date createdAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "order")
    Set<OrderItem> orderItems;

    public Order() {
    }

    public Order(Integer shippingStatus, Integer paymentMethod, Integer paymentStatus, String shippingAddress, Date createdAt, User user) {
        this.shippingStatus = shippingStatus;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.shippingAddress = shippingAddress;
        this.createdAt = createdAt;
        this.user = user;
    }
}
