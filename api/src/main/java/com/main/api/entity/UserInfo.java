package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_info")
@Getter
@Setter
public class UserInfo {
    @Id
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "address")
    private String address;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "dob")
    private Date dob;
    @Column(name = "gender")
    private Integer gender;
    @OneToOne(mappedBy = "userInfo")
    private UserAccount userAccount;

    public UserInfo() {
    }

    public UserInfo(Long userId, String fullName, String address, String phoneNumber, Date dob, Integer gender) {
        this.userId = userId;
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "UserInfo{" + "userId=" + userId + ", address='" + address + '\'' + ", fullName='" + fullName + '\'' + ", phoneNumber='" + phoneNumber + '\'' + ", dob=" + dob + ", gender=" + gender + '}';
    }
}
