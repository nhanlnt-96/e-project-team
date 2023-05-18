package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "cart")
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "created_at")
    private Date createdAt;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "cart")
    private Set<ProductCart> productCarts;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public void addItem(Product product, NetWeight netWeight, int quantity) {
        if (product != null) {
            if (productCarts == null) {
                productCarts = new HashSet<>();
            }

            ProductCart existingProductCart = productCarts.stream().filter(item -> item.getProduct().getProductId().equals(product.getProductId()) && item.getNetWeight().getNetWeightId().equals(netWeight.getNetWeightId())).findAny().orElse(null);
            ProductQuantity productQuantity = product.getProductQuantities().stream().filter(item -> item.getNetWeight().getNetWeightId().equals(netWeight.getNetWeightId())).findFirst().orElse(null);

            if (productQuantity != null && productQuantity.getQuantity() >= quantity) {
                if (existingProductCart != null) {
                    int newQuantity = existingProductCart.getQuantity() + quantity;
                    if (newQuantity <= productQuantity.getQuantity()) {
                        existingProductCart.setQuantity(newQuantity);
                    } else {
                        throw new NoResultException("Quantity can not be larger than the current product quantity");
                    }
                } else {
                    productCarts.add(new ProductCart(quantity, this, product, netWeight));
                }
            } else {
                throw new NoResultException("Quantity can not be larger than the current product quantity");
            }
        }
    }

    public Cart() {
    }

    public Cart(User user, Date createdAt) {
        this.user = user;
        this.createdAt = createdAt;
    }
}
