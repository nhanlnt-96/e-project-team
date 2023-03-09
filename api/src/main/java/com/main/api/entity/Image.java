package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;
    @Column(name = "image_name")
    private String imageName;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public Image() {
    }

    public Image(String imageName, Product product) {
        this.imageName = imageName;
        this.product = product;
    }

    @Override
    public String toString() {
        return "Image{" + "imageId=" + imageId + ", imageName='" + imageName + '\'' + '}';
    }
}
