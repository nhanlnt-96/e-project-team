package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "store_open_hour")
@Getter
@Setter
public class StoreOpenHour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "day")
    private Integer day;
    @Column(name = "from_time")
    private String fromTime;
    @Column(name = "to_time")
    private String toTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    StoreInfo storeInfo;

    public StoreOpenHour() {
    }

    public StoreOpenHour(Integer day, String fromTime, String toTime, StoreInfo storeInfo) {
        this.day = day;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.storeInfo = storeInfo;
    }
}
