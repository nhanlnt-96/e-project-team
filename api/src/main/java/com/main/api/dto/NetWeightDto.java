package com.main.api.dto;

import lombok.Data;

@Data
public class NetWeightDto {
    private Long netWeightId;
    private String netWeightLabel;
    private Integer netWeightValue;

    public NetWeightDto() {
    }

    public NetWeightDto(Long netWeightId, String netWeightLabel, Integer netWeightValue) {
        this.netWeightId = netWeightId;
        this.netWeightLabel = netWeightLabel;
        this.netWeightValue = netWeightValue;
    }

    public Long getNetWeightId() {
        return netWeightId;
    }

    public void setNetWeightId(Long netWeightId) {
        this.netWeightId = netWeightId;
    }

    public String getNetWeightLabel() {
        return netWeightLabel;
    }

    public void setNetWeightLabel(String netWeightLabel) {
        this.netWeightLabel = netWeightLabel;
    }

    public Integer getNetWeightValue() {
        return netWeightValue;
    }

    public void setNetWeightValue(Integer netWeightValue) {
        this.netWeightValue = netWeightValue;
    }
}
