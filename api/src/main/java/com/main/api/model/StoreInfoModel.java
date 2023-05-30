package com.main.api.model;

import org.springframework.lang.Nullable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class StoreInfoModel {
    public static class StoreOpenHour {
        @NotEmpty(message = "day can not be null.")
        private String day;
        @NotEmpty(message = "fromTime can not be null.")
        private String fromTime;
        @NotEmpty(message = "toTime can not be null.")
        private String toTime;

        public StoreOpenHour() {
        }

        public StoreOpenHour(String day, String fromTime, String toTime) {
            this.day = day;
            this.fromTime = fromTime;
            this.toTime = toTime;
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

    public static class CreateStoreInfo {
        @NotEmpty(message = "storeName can not be null.")
        String storeName;
        @NotEmpty(message = "address can not be null.")
        String address;
        @NotEmpty(message = "phoneNumber can not be null.")
        private String phoneNumber;

        public CreateStoreInfo() {
        }

        public CreateStoreInfo(String storeName, String address, String phoneNumber) {
            this.storeName = storeName;
            this.address = address;
            this.phoneNumber = phoneNumber;
        }

        public String getStoreName() {
            return storeName;
        }

        public void setStoreName(String storeName) {
            this.storeName = storeName;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
    }

    public static class CreateStoreOpenHour {
        @NotEmpty(message = "storeOpenHour can not be null.")
        private List<StoreOpenHour> storeOpenHours;

        public CreateStoreOpenHour() {
        }

        public CreateStoreOpenHour(List<StoreOpenHour> storeOpenHours) {
            this.storeOpenHours = storeOpenHours;
        }

        public List<StoreOpenHour> getStoreOpenHours() {
            return storeOpenHours;
        }

        public void setStoreOpenHours(List<StoreOpenHour> storeOpenHours) {
            this.storeOpenHours = storeOpenHours;
        }
    }

    public static class UpdateStoreInfo {
        @NotNull(message = "storeId can not be null")
        Long storeId;
        String storeName;
        String address;
        private String phoneNumber;

        public UpdateStoreInfo() {
        }

        public UpdateStoreInfo(Long storeId, String storeName, String address, String phoneNumber) {
            this.storeId = storeId;
            this.storeName = storeName;
            this.address = address;
            this.phoneNumber = phoneNumber;
        }

        public Long getStoreId() {
            return storeId;
        }

        public void setStoreId(Long storeId) {
            this.storeId = storeId;
        }

        public String getStoreName() {
            return storeName;
        }

        public void setStoreName(String storeName) {
            this.storeName = storeName;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
    }

    public static class UpdateStoreOpenHourItem {
        @NotNull(message = "storeOpenHourId can not be null")
        private Long id;
        private String day;
        private String fromTime;
        private String toTime;

        public UpdateStoreOpenHourItem() {
        }

        public UpdateStoreOpenHourItem(Long id, String day, String fromTime, String toTime) {
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

    public static class UpdateStoreOpenHour {
        @Nullable
        private List<UpdateStoreOpenHourItem> storeOpenHours;

        public UpdateStoreOpenHour() {
        }

        public UpdateStoreOpenHour(@Nullable List<UpdateStoreOpenHourItem> updateStoreOpenHourItem) {
            this.storeOpenHours = updateStoreOpenHourItem;
        }

        @Nullable
        public List<UpdateStoreOpenHourItem> getStoreOpenHours() {
            return storeOpenHours;
        }

        public void setStoreOpenHours(@Nullable List<UpdateStoreOpenHourItem> storeOpenHours) {
            this.storeOpenHours = storeOpenHours;
        }
    }

    public static class RemoveStoreWorkingHour {
        @NotNull(message = "storeId can not be null")
        Long storeId;
        @NotNull(message = "workingHourId can not be null")
        Long workingHourId;

        public RemoveStoreWorkingHour() {
        }

        public RemoveStoreWorkingHour(Long storeId, Long workingHourId) {
            this.storeId = storeId;
            this.workingHourId = workingHourId;
        }

        public Long getStoreId() {
            return storeId;
        }

        public void setStoreId(Long storeId) {
            this.storeId = storeId;
        }

        public Long getWorkingHourId() {
            return workingHourId;
        }

        public void setWorkingHourId(Long workingHourId) {
            this.workingHourId = workingHourId;
        }
    }
}
