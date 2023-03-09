package com.main.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "product_image")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    private Long productImageId;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "image_id")
    private Image image;

    public ProductImage() {
    }

    public ProductImage(Long productImageId, Product product, Image image) {
        this.productImageId = productImageId;
        this.product = product;
        this.image = image;
    }

    @Override
    public String toString() {
        return "ProductImage{" + "productImageId=" + productImageId + ", product=" + product + ", image=" + image + '}';
    }
}
