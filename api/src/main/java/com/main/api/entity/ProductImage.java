package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_image")
@Getter
@Setter
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;
    @Column(name = "image_name")
    private String imageName;
    @Column(name = "storage_name")
    private String storageName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductImage() {
    }

    public ProductImage(String imageName, String storageName, Product product) {
        this.imageName = imageName;
        this.storageName = storageName;
        this.product = product;
    }

    @Override
    public String toString() {
        return "ProductImage{" + "imageId=" + imageId + ", imageName='" + imageName + '\'' + ", storageName='" + storageName + '\'' + ", product=" + product + '}';
    }
}
