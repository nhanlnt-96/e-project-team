package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_account")
@Getter
@Setter
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private int role;
    @Column(name = "status")
    private Boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

    public UserAccount() {
    }

    public UserAccount(String username, String password, int role, Boolean status) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserAccount{" + "userId=" + userId + ", username='" + username + '\'' + ", password='" + password + '\'' + ", role=" + role + ", status=" + status + '}';
    }
}
