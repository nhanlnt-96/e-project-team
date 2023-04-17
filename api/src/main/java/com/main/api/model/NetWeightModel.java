package com.main.api.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class NetWeightModel {
    public static class CreateNetWeight {
        @NotEmpty(message = "netWeightLabel can not be null.")
        private String netWeightLabel;
        @NotNull(message = "netWeightValue can not be null.")
        @Min(value = 1, message = "netWeightValue must greater than 1.")
        private Integer netWeightValue;

        public CreateNetWeight() {
        }

        public CreateNetWeight(String netWeightLabel, Integer netWeightValue) {
            this.netWeightLabel = netWeightLabel;
            this.netWeightValue = netWeightValue;
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

    public static class UpdateNetWeight {
        @NotNull(message = "netWeightId can not be null.")
        private Long netWeightId;
        private String netWeightLabel;
        @Min(value = 1, message = "netWeightValue must greater than 1.")
        private Integer netWeightValue;

        public UpdateNetWeight() {
        }

        public UpdateNetWeight(Long netWeightId, String netWeightLabel, Integer netWeightValue) {
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
}
