package com.main.api.dao;

import com.main.api.entity.UserAccount;
import com.main.api.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

}
