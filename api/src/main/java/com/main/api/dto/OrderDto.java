package com.main.api.dto;

import com.main.api.entity.OrderItem;
import com.main.api.entity.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class OrderDto {
    private Long id;
    private Integer shippingStatus;
    private Integer paymentMethod;
    private Integer paymentStatus;
    private String shippingAddress;
    private String receiverName;
    private String receiverPhone;
    private Date createdAt;
    List<OrderItemDto> orderItems;

    public OrderDto() {
    }

    public OrderDto(Long id, Integer shippingStatus, Integer paymentMethod, Integer paymentStatus, String shippingAddress, String receiverName, String receiverPhone, Date createdAt, List<OrderItemDto> orderItems) {
        this.id = id;
        this.shippingStatus = shippingStatus;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.shippingAddress = shippingAddress;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        this.createdAt = createdAt;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getShippingStatus() {
        return shippingStatus;
    }

    public void setShippingStatus(Integer shippingStatus) {
        this.shippingStatus = shippingStatus;
    }

    public Integer getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(Integer paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Integer getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Integer paymentStatus) {
        this.paymentStatus = paymentStatus;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }
}
