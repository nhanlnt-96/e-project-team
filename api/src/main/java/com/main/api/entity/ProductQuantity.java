package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_quantity")
@Getter
@Setter
public class ProductQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long quantityId;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "price")
    private Double price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "net_weight_id")
    private NetWeight netWeight;

    public ProductQuantity() {
    }

    public ProductQuantity(Integer quantity, Double price, Product product, NetWeight netWeight) {
        this.quantity = quantity;
        this.price = price;
        this.product = product;
        this.netWeight = netWeight;
    }

    @Override
    public String toString() {
        return "ProductQuantity{" +
                "quantityId=" + quantityId +
                ", quantity=" + quantity +
                ", price=" + price +
                ", product=" + product +
                ", netWeight=" + netWeight +
                '}';
    }
}
