package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "store")
@Getter
@Setter
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long storeId;

    private String name;

    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "opening_hours")
    private String openingHours;

    public Store() {
    }

    public Store(String name, String description, String phoneNumber, String openingHours) {
        this.name = name;
        this.address = description;
        this.phoneNumber = phoneNumber;
        this.openingHours = openingHours;
    }

    @Override
    public String toString() {
        return "Stores{" +
                "storeId=" + storeId +
                ", name='" + name + '\'' +
                ", description='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", openingHours='" + openingHours + '\'' +
                '}';
    }
}
