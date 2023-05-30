package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "store_info")
@Getter
@Setter
public class StoreInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "store_name")
    private String storeName;
    @Column(name = "address")
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "store_image")
    private String storeImage;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "storeInfo")
    Set<StoreOpenHour> storeOpenHours;

    public StoreInfo() {
    }

    public StoreInfo(String storeName, String address, String phoneNumber, String storeImage) {
        this.storeName = storeName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.storeImage = storeImage;
    }
}
