package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_favorite")
@Getter
@Setter
public class ProductFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    Product product;

    public ProductFavorite() {
    }

    public ProductFavorite(User user, Product product) {
        this.user = user;
        this.product = product;
    }

    @Override
    public String toString() {
        return "ProductFavorite{" +
                "id=" + id +
                ", user=" + user +
                ", product=" + product +
                '}';
    }
}
