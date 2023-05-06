package com.main.api.controller;

import com.main.api.configs.EmailService;
import com.main.api.constant.Constant;
import com.main.api.dao.RoleRepository;
import com.main.api.dao.TokenRepository;
import com.main.api.dao.UserRepository;
import com.main.api.dto.UserDto;
import com.main.api.entity.Role;
import com.main.api.entity.Token;
import com.main.api.entity.User;
import com.main.api.mailTemplate.MailTemplate;
import com.main.api.model.UserModel;
import com.main.api.utils.ConvertDate;
import com.main.api.utils.GenerateToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.mail.MessagingException;
import javax.persistence.NoResultException;
import javax.validation.Valid;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class UserController {
    final private UserRepository userRepository;
    final private PasswordEncoder passwordEncoder;
    final private RoleRepository roleRepository;
    final private EmailService emailService;
    final private TokenRepository tokenRepository;
    final private String defaultRoleName = Constant.USER_ROLE;
    final private long millisecondsPerHour = 60 * 60 * 1000;
    final private long twoHoursInMil = 2 * millisecondsPerHour;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, EmailService emailService, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
        this.tokenRepository = tokenRepository;
    }

    @PostMapping("/register")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserModel.RegisterData userData) throws ParseException {
        User checkEmailExist = userRepository.findByEmail(userData.getEmail()).orElse(null);
        User checkPhoneNumberExist = userRepository.findByPhoneNumber(userData.getPhoneNumber()).orElse(null);
        if (checkEmailExist != null) throw new NoResultException("Email already exist.");
        if (checkPhoneNumberExist != null) throw new NoResultException("Phone number already exist.");
        if (!Objects.equals(userData.getPassword(), userData.getConfirmPassword()))
            throw new NoResultException("Confirm password does not match.");

        var rawPassword = userData.getPassword();
        var encodedPassword = passwordEncoder.encode(rawPassword);
        Date dob = ConvertDate.ConvertStringToDate(userData.getDob());
        User user = new User(userData.getAddressDetail(), userData.getPhoneNumber(), userData.getEmail(), encodedPassword, userData.getFullName(), Constant.NOT_VERIFY_EMAIL, userData.getGender(), dob);
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
                    return new ResponseEntity<>(new UserDto(userSaveResponse), HttpStatus.CREATED);
                }
            }
        }

        throw new NoResultException("Register failed.");
    }

    @PostMapping("/create-new-account")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<UserDto> createNewAccount(@Valid @RequestBody UserModel.CreateNewAccount userData) throws ParseException {
        User checkEmailExist = userRepository.findByEmail(userData.getEmail()).orElse(null);
        User checkPhoneNumberExist = userRepository.findByPhoneNumber(userData.getPhoneNumber()).orElse(null);
        if (checkEmailExist != null) throw new NoResultException("Email already exist.");
        if (checkPhoneNumberExist != null) throw new NoResultException("Phone number already exist.");

        var rawPassword = userData.getPassword();
        var encodedPassword = passwordEncoder.encode(rawPassword);
        Date dob = ConvertDate.ConvertStringToDate(userData.getDob());
        User user = new User(userData.getAddressDetail(), userData.getPhoneNumber(), userData.getEmail(), encodedPassword, userData.getFullName(), Constant.NOT_VERIFY_EMAIL, userData.getGender(), dob);
        User userSaveResponse = userRepository.save(user);
        if (userSaveResponse.getUserId() != null) {
            boolean assignRoleResponse = assignRoleForUser(user.getUserId(), userData.getRoleId() != null ? userData.getRoleId() : roleRepository.findByRoleName(defaultRoleName).getRoleId());
            if (assignRoleResponse) {
                try {
                    emailService.sendSimpleMessage(userSaveResponse.getEmail(), "Register Successful", MailTemplate.WelcomeMail(userSaveResponse.getFullName()), true);
                } catch (MessagingException messagingException) {
                    System.out.println(messagingException.getMessage());
                }
                return new ResponseEntity<>(new UserDto(userSaveResponse), HttpStatus.CREATED);
            }
        }

        throw new NoResultException("Create account failed.");
    }

    @PutMapping("/update-account")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<UserDto> updateAccount(@Valid @RequestBody UserModel.UpdateAccount updateAccount) throws ParseException {
        User checkUserExist = userRepository.findById(updateAccount.getUserId()).orElseThrow(() -> new NoResultException("Account does not exist."));
        if (updateAccount.getAddressDetail() != null) checkUserExist.setAddressDetail(updateAccount.getAddressDetail());
        if (updateAccount.getPhoneNumber() != null) checkUserExist.setPhoneNumber(updateAccount.getPhoneNumber());
        if (updateAccount.getFullName() != null) checkUserExist.setFullName(updateAccount.getFullName());
        if (updateAccount.getPassword() != null) {
            var rawPassword = updateAccount.getPassword();
            var encodedPassword = passwordEncoder.encode(rawPassword);
            checkUserExist.setPassword(encodedPassword);
        }
        if (updateAccount.getGender() != null) checkUserExist.setGender(updateAccount.getGender());
        if (updateAccount.getDob() != null) {
            Date dob = ConvertDate.ConvertStringToDate(updateAccount.getDob());
            checkUserExist.setDob(dob);
        }

        User updateUserResponse = userRepository.saveAndFlush(checkUserExist);

        return new ResponseEntity<>(new UserDto(updateUserResponse), HttpStatus.OK);
    }

    @DeleteMapping("/remove-account/{userId}")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<String> removeAccount(@Valid @PathVariable("userId") Long userId) {
        User checkUserExist = userRepository.findById(userId).orElseThrow(() -> new NoResultException("Account does not exist."));
        userRepository.delete(checkUserExist);
        return new ResponseEntity<>("Removed account.", HttpStatus.OK);
    }

    @PostMapping("/get-reset-password-token")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<String> getResetPasswordToken(@Valid @RequestBody UserModel.GetResetPasswordToken resetPasswordTokenData) {
        User checkUserExist = userRepository.findByEmail(resetPasswordTokenData.getEmail()).orElseThrow(() -> new NoResultException("Account does not exist."));
        Date currentDate = new Date();
        Token checkTokenExist = tokenRepository.findByUser_UserId_AndTokenName(checkUserExist.getUserId(), Constant.CHANGE_PASSWORD_TOKEN_NAME).orElse(null);
        String changePasswordLink = "http://localhost:3000/authenticate/reset-password/";
        if (checkTokenExist != null && checkTokenExpired(checkTokenExist.getCreatedAt())) {
            changePasswordLink = changePasswordLink + checkTokenExist.getTokenValue();
        } else {
            // INFO: remove token if expired
            if (checkTokenExist != null && !checkTokenExpired(checkTokenExist.getCreatedAt()))
                removeToken(checkTokenExist.getId());
            Token tokenData = new Token(Constant.CHANGE_PASSWORD_TOKEN_NAME, GenerateToken.generateToken().toString(), currentDate);
            tokenData.setUser(checkUserExist);
            Token saveTokenData = tokenRepository.save(tokenData);
            if (saveTokenData.getId() != 0) {
                changePasswordLink = changePasswordLink + saveTokenData.getTokenValue();
            }
        }
        try {
            emailService.sendSimpleMessage(checkUserExist.getEmail(), "Change Password", MailTemplate.ChangePasswordMail(checkUserExist.getFullName(), changePasswordLink), true);
        } catch (MessagingException messagingException) {
            System.out.println(messagingException.getMessage());
        }
        return new ResponseEntity<>("New email sent to your email", HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> resetPassword(@Valid @RequestBody UserModel.ResetPassword resetPasswordData) {
        Token checkTokenExist = tokenRepository.findByTokenValue(resetPasswordData.getToken()).orElseThrow(() -> new NoResultException("Token does not exist"));
        User checkUserExist = userRepository.findById(checkTokenExist.getUser().getUserId()).orElseThrow(() -> new NoResultException("Account does not exist."));
        if (checkTokenExpired(checkTokenExist.getCreatedAt())) {
            if (resetPasswordData.getPassword() == null) throw new NoResultException("password can not be null");
            if (resetPasswordData.getConfirmPassword() == null) throw new NoResultException("password can not be null");
            if (!Objects.equals(resetPasswordData.getPassword(), resetPasswordData.getConfirmPassword()))
                throw new NoResultException("Confirm password does not match.");

            var rawPassword = resetPasswordData.getPassword();
            var encodedPassword = passwordEncoder.encode(rawPassword);

            checkUserExist.setPassword(encodedPassword);

            User updateUserResponse = userRepository.saveAndFlush(checkUserExist);

            // INFO: remove token after update success
            removeToken(checkTokenExist.getId());

            return new ResponseEntity<>(new UserDto(updateUserResponse), HttpStatus.OK);
        } else {
            // INFO: remove token when token has been expired
            removeToken(checkTokenExist.getId());

            throw new NoResultException("Token has been expired");
        }
    }

    @PostMapping("/get-verify-email-token")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<String> getVerifyEmailToken() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User checkUserExist = userRepository.findByEmail(userEmail).orElseThrow(() -> new NoResultException("Account does not exist."));
        Date currentDate = new Date();
        Token checkTokenExist = tokenRepository.findByUser_UserId_AndTokenName(checkUserExist.getUserId(), Constant.VERIFY_EMAIL_TOKEN_NAME).orElse(null);
        String verifyEmailLink = "http://localhost:3000/authenticate/verify-email/";
        if (checkTokenExist != null && checkTokenExpired(checkTokenExist.getCreatedAt())) {
            verifyEmailLink = verifyEmailLink + checkTokenExist.getTokenValue();
        } else {
            // INFO: remove token if expired
            if (checkTokenExist != null && !checkTokenExpired(checkTokenExist.getCreatedAt()))
                removeToken(checkTokenExist.getId());
            Token tokenData = new Token(Constant.VERIFY_EMAIL_TOKEN_NAME, GenerateToken.generateToken().toString(), currentDate);
            tokenData.setUser(checkUserExist);
            Token saveTokenData = tokenRepository.save(tokenData);
            if (saveTokenData.getId() != 0) {
                verifyEmailLink = verifyEmailLink + saveTokenData.getTokenValue();
            }
        }
        try {
            emailService.sendSimpleMessage(checkUserExist.getEmail(), "Verify Email", MailTemplate.VerifyEmailMail(verifyEmailLink), true);
        } catch (MessagingException messagingException) {
            System.out.println(messagingException.getMessage());
        }
        return new ResponseEntity<>("New email sent to your email", HttpStatus.OK);
    }

    @PutMapping("/verify-email")
    @Transactional(rollbackFor = Exception.class)
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody UserModel.VerifyEmail verifyEmailData) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Token checkTokenExist = tokenRepository.findByTokenValue(verifyEmailData.getToken()).orElseThrow(() -> new NoResultException("Token does not exist"));
        User checkUserExist = userRepository.findByEmail(userEmail).orElseThrow(() -> new NoResultException("Account does not exist."));
        if (checkTokenExpired(checkTokenExist.getCreatedAt())) {
            checkUserExist.setVerifyEmail(Constant.VERIFIED_EMAIL);

            User updateUserResponse = userRepository.saveAndFlush(checkUserExist);

            // INFO: remove token after update success
            removeToken(checkTokenExist.getId());

            return new ResponseEntity<>(new UserDto(updateUserResponse), HttpStatus.OK);
        } else {
            // INFO: remove token when token has been expired
            removeToken(checkTokenExist.getId());

            throw new NoResultException("Token has been expired");
        }
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

    private boolean checkTokenExpired(Date tokenCreated) {
        Date currentDate = new Date();
        return currentDate.getTime() - tokenCreated.getTime() < twoHoursInMil;
    }

    public void removeToken(Long tokenId) {
        tokenRepository.deleteById(tokenId);
    }
}
