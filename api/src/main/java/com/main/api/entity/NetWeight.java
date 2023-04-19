package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "net_weight")
@Getter
@Setter
public class NetWeight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long netWeightId;
    @Column(name = "net_weight_label")
    private String netWeightLabel;
    @Column(name = "net_weight_value")
    private Integer netWeightValue;
    @OneToMany(mappedBy = "netWeight")
    private Set<ProductQuantity> productQuantities;

    public NetWeight() {
    }

    public NetWeight(String netWeightLabel, Integer netWeightValue) {
        this.netWeightLabel = netWeightLabel;
        this.netWeightValue = netWeightValue;
    }

    @Override
    public String toString() {
        return "NetWeight{" +
                "netWeightId=" + netWeightId +
                ", netWeightLabel='" + netWeightLabel + '\'' +
                ", netWeightValue=" + netWeightValue +
                '}';
    }
}
