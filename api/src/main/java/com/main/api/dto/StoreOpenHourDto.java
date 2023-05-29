package com.main.api.dto;

import lombok.Data;

@Data
public class StoreOpenHourDto {
    private Long id;
    private String day;
    private String fromTime;
    private String toTime;

    public StoreOpenHourDto() {
    }

    public StoreOpenHourDto(Long id, String day, String fromTime, String toTime) {
        this.id = id;
        this.day = day;
        this.fromTime = fromTime;
        this.toTime = toTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }
}
