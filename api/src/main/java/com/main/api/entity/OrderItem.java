package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "price")
    private Double price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    Order order;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "net_weight_id")
    NetWeight netWeight;

    public OrderItem() {
    }

    public OrderItem(Integer quantity, Double price, Order order, Product product, NetWeight netWeight) {
        this.quantity = quantity;
        this.price = price;
        this.order = order;
        this.product = product;
        this.netWeight = netWeight;
    }
}
