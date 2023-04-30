package com.main.api.controller;

import com.main.api.configs.EmailService;
import com.main.api.constant.Constant;
import com.main.api.dao.RoleRepository;
import com.main.api.dao.UserRepository;
import com.main.api.dto.UserDto;
import com.main.api.entity.Role;
import com.main.api.entity.User;
import com.main.api.mailTemplate.MailTemplate;
import com.main.api.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.mail.MessagingException;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class UserController {
    final private String defaultRoleName = Constant.USER_ROLE;
    final private UserRepository userRepository;
    final private PasswordEncoder passwordEncoder;
    final private RoleRepository roleRepository;
    final private EmailService emailService;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserModel.RegisterData userData) {
        User checkEmailExist = userRepository.findByEmail(userData.getEmail()).orElse(null);
        User checkPhoneNumberExist = userRepository.findByPhoneNumber(userData.getPhoneNumber()).orElse(null);
        if (checkEmailExist != null) throw new NoResultException("Email already exist.");
        if (checkPhoneNumberExist != null) throw new NoResultException("Phone number already exist.");
        if (!Objects.equals(userData.getPassword(), userData.getConfirmPassword()))
            throw new NoResultException("Confirm password does not match.");

        var rawPassword = userData.getPassword();
        var encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(userData.getAddressDetail(), userData.getPhoneNumber(), userData.getEmail(), encodedPassword, userData.getFullName());
        User userSaveResponse = userRepository.save(user);
        if (userSaveResponse.getUserId() != null) {
            Role role = getRoleDataByName(defaultRoleName);
            if (role != null) {
                boolean assignRoleResponse = assignRoleForUser(user.getUserId(), role.getRoleId());
                if (assignRoleResponse) {
                    try {
                        emailService.sendSimpleMessage(userSaveResponse.getEmail(), "Register Successful", MailTemplate.WelcomeMail(userSaveResponse.getFullName()), true);
                    } catch (MessagingException messagingException) {
                        System.out.println(messagingException.getMessage());
                    }
                    return new ResponseEntity<>(new UserDto(userSaveResponse.getUserId(), userSaveResponse.getAddressDetail(), userSaveResponse.getPhoneNumber(), userSaveResponse.getEmail(), userSaveResponse.getFullName()), HttpStatus.CREATED);
                }
            }
        }

        throw new NoResultException("Register failed.");
    }

    @PostMapping("/create-new-account")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<UserDto> createNewAccount(@Valid @RequestBody UserModel.CreateNewAccount userData) {
        User checkEmailExist = userRepository.findByEmail(userData.getEmail()).orElse(null);
        User checkPhoneNumberExist = userRepository.findByPhoneNumber(userData.getPhoneNumber()).orElse(null);
        if (checkEmailExist != null) throw new NoResultException("Email already exist.");
        if (checkPhoneNumberExist != null) throw new NoResultException("Phone number already exist.");

        var rawPassword = userData.getPassword();
        var encodedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(userData.getAddressDetail(), userData.getPhoneNumber(), userData.getEmail(), encodedPassword, userData.getFullName());
        User userSaveResponse = userRepository.save(user);
        if (userSaveResponse.getUserId() != null) {
            boolean assignRoleResponse = assignRoleForUser(user.getUserId(), userData.getRoleId() != null ? userData.getRoleId() : roleRepository.findByRoleName(defaultRoleName).getRoleId());
            if (assignRoleResponse) {
                try {
                    emailService.sendSimpleMessage(userSaveResponse.getEmail(), "Register Successful", MailTemplate.WelcomeMail(userSaveResponse.getFullName()), true);
                } catch (MessagingException messagingException) {
                    System.out.println(messagingException.getMessage());
                }
                return new ResponseEntity<>(new UserDto(userSaveResponse.getUserId(), userSaveResponse.getAddressDetail(), userSaveResponse.getPhoneNumber(), userSaveResponse.getEmail(), userSaveResponse.getFullName()), HttpStatus.CREATED);
            }
        }

        throw new NoResultException("Create account failed.");
    }

    @PutMapping("/update-account")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<UserDto> updateAccount(@Valid @RequestBody UserModel.UpdateAccount updateAccount) {
        User checkUserExist = userRepository.findById(updateAccount.getUserId()).orElseThrow(() -> new NoResultException("Account does not exist."));
        if (updateAccount.getAddressDetail() != null) checkUserExist.setAddressDetail(updateAccount.getAddressDetail());
        if (updateAccount.getPhoneNumber() != null) checkUserExist.setPhoneNumber(updateAccount.getPhoneNumber());
        if (updateAccount.getFullName() != null) checkUserExist.setFullName(updateAccount.getFullName());

        User updateUserResponse = userRepository.saveAndFlush(checkUserExist);

        return new ResponseEntity<>(new UserDto(updateUserResponse.getUserId(), updateUserResponse.getAddressDetail(), updateUserResponse.getPhoneNumber(), updateUserResponse.getEmail(), updateUserResponse.getFullName()), HttpStatus.OK);
    }

    @DeleteMapping("/remove-account/{userId}")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<String> removeAccount(@Valid @PathVariable("userId") Long userId) {
        User checkUserExist = userRepository.findById(userId).orElseThrow(() -> new NoResultException("Account does not exist."));
        userRepository.delete(checkUserExist);
        return new ResponseEntity<>("Removed account.", HttpStatus.OK);
    }

    private Role getRoleDataByName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    private boolean assignRoleForUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId).get();
        user.addRole(new Role(roleId));

        User assignRole = userRepository.save(user);
        return assignRole.getRoles() != null;
    }
}
