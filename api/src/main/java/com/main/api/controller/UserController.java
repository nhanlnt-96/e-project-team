package com.main.api.controller;

import com.main.api.constant.Constant;
import com.main.api.dao.UserAccountRepository;
import com.main.api.dao.UserInfoRepository;
import com.main.api.dto.UserDto;
import com.main.api.dto.UserInfoDto;
import com.main.api.entity.UserAccount;
import com.main.api.entity.UserInfo;
import com.main.api.model.UserModel;
import com.main.api.utils.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<UserDto> registerAccount(@Valid @RequestBody UserModel.RegisterData registerData) {
        UserAccount checkUsernameExist = getUserByUsername(registerData.getUsername());

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

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody UserModel.LoginData loginData) {
        UserAccount checkUserExist = getUserByUsername(loginData.getUsername());
        if (checkUserExist == null) {
            throw new NoResultException("Username does not exits.");
        } else {
            if (PasswordEncoder.verifyPassword(checkUserExist.getPassword(), loginData.getPassword())) {
                return new ResponseEntity<>(generateUserDto(checkUserExist, checkUserExist.getUserInfo()), HttpStatus.OK);
            } else {
                throw new NoResultException("Password incorrect.");
            }
        }
    }

    private UserAccount getUserByUsername(String username) {
        return userAccountRepository.findByUsername(username);
    }

    private UserDto generateUserDto(UserAccount userAccount, UserInfo userInfo) {
        UserDto userDto = new UserDto();

        UserInfoDto userInfoDto = new UserInfoDto(userInfo);

        userDto.setUserId(userAccount.getUserId());
        userDto.setUsername(userAccount.getUsername());
        userDto.setRole(userAccount.getRole());
        userDto.setStatus(userAccount.getStatus());
        userDto.setUserInfo(userInfoDto);

        return userDto;
    }
}
