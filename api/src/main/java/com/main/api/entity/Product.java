package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;
    @Column(name = "description")
    private String description;
    @Column(name = "product_name")
    private String productName;
    @Column(name = "product_price")
    private Integer productPrice;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "product")
    private Set<ProductImage> productImages;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "product")
    private Set<ProductQuantity> productQuantities;

    public Product() {
    }

    public Product(String description, String productName, Integer productPrice) {
        this.description = description;
        this.productName = productName;
        this.productPrice = productPrice;
    }

    @Override
    public String toString() {
        return "Product{" + "productId=" + productId + ", description='" + description + '\'' + ", productName='" + productName + '\'' + ", productPrice=" + productPrice + ", category=" + category + ", images=" + productImages + '}';
    }
}
