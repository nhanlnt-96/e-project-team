package com.main.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "product_cart")
@Getter
@Setter
public class ProductCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "quantity")
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;
    @OneToOne
    @JoinColumn(name = "net_weight_id", referencedColumnName = "id")
    private NetWeight netWeight;

    public ProductCart() {
    }

    public ProductCart(Integer quantity, Cart cart, Product product, NetWeight netWeight) {
        this.quantity = quantity;
        this.cart = cart;
        this.product = product;
        this.netWeight = netWeight;
    }
}
