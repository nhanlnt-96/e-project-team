package com.main.api.controller;

import com.main.api.constant.Constant;
import com.main.api.dao.UserAccountRepository;
import com.main.api.dao.UserInfoRepository;
import com.main.api.dto.UserDto;
import com.main.api.dto.UserInfoDto;
import com.main.api.entity.UserAccount;
import com.main.api.entity.UserInfo;
import com.main.api.model.User;
import com.main.api.utils.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.persistence.NoResultException;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class UserController {
    private final UserAccountRepository userAccountRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public UserController(UserAccountRepository userAccountRepository, UserInfoRepository userInfoRepository) {
        this.userAccountRepository = userAccountRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerAccount(@Valid @RequestBody User.RegisterData registerData) {
        UserDto checkUsernameExist = getUserByUsername(registerData.getUsername());

        if (checkUsernameExist == null) {
            UserAccount userAccount = new UserAccount(registerData.getUsername(), PasswordEncoder.hashPassword(registerData.getPassword()), Constant.USER_ROLE, Constant.ACTIVE_STATUS);
            UserAccount saveUserAccountResponse = userAccountRepository.save(userAccount);

            UserInfo saveUserInfoResponse = null;
            if (saveUserAccountResponse.getUserId() != 0) {
                UserInfo userInfo = new UserInfo(saveUserAccountResponse.getUserId(), registerData.getFullName(), null, null, null, null);
                saveUserInfoResponse = userInfoRepository.save(userInfo);
            }

            if (saveUserInfoResponse != null) {
                return new ResponseEntity<>(generateUserDto(saveUserAccountResponse, saveUserInfoResponse), HttpStatus.CREATED);
            }
            throw new NoResultException("Register failed.");
        }
        throw new NoResultException("Username is exist");
    }

    private UserDto getUserByUsername(String username) {
        UserAccount userData = userAccountRepository.findByUsername(username);
        if (userData != null) {
            return generateUserDto(userData, userData.getUserInfo());
        }
        return null;
    }

    private UserDto generateUserDto(UserAccount userAccount, UserInfo userInfo) {
        UserDto userDto = new UserDto();

        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setUserId(userInfo.getUserId());
        userInfoDto.setFullName(userInfo.getFullName());
        userInfoDto.setAddress(userInfo.getAddress());
        userInfoDto.setPhoneNumber(userInfoDto.getPhoneNumber());
        userInfoDto.setGender(userInfoDto.getGender());
        userDto.setRole(userDto.getRole());

        userDto.setUserId(userAccount.getUserId());
        userDto.setUsername(userAccount.getUsername());
        userDto.setRole(userAccount.getRole());
        userDto.setStatus(userAccount.getStatus());
        userDto.setUserInfo(userInfoDto);

        return userDto;
    }
}
