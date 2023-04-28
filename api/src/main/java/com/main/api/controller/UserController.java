package com.main.api.controller;

import com.main.api.constant.Constant;
import com.main.api.dao.RoleRepository;
import com.main.api.dao.UserRepository;
import com.main.api.dto.UserDto;
import com.main.api.entity.Role;
import com.main.api.entity.User;
import com.main.api.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
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
                    return new ResponseEntity<>(new UserDto(userSaveResponse.getUserId(), userSaveResponse.getAddressDetail(), userSaveResponse.getPhoneNumber(), userSaveResponse.getEmail(), userSaveResponse.getFullName()), HttpStatus.CREATED);
                }
            }
        }

        throw new NoResultException("Register failed.");
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
