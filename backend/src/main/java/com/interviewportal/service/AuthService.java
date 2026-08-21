package com.interviewportal.service;

import com.interviewportal.entity.Otp;
import com.interviewportal.dto.request.ForgotPasswordRequest;
import com.interviewportal.dto.request.LoginRequest;
import com.interviewportal.dto.request.RegisterRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.AuthResponse;
import com.interviewportal.dto.response.UserResponse;
import com.interviewportal.entity.User;
import com.interviewportal.enums.Role;
import com.interviewportal.exception.BadRequestException;
import com.interviewportal.exception.DuplicateResourceException;
import com.interviewportal.exception.UnauthorizedException;
import com.interviewportal.repository.UserRepository;
import com.interviewportal.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.interviewportal.dto.request.VerifyOtpRequest;
import com.interviewportal.dto.request.ResetPasswordRequest;
import com.interviewportal.repository.OtpRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;
    private final OtpRepository otpRepository;

    public AuthResponse register(RegisterRequest req) {

        List<User> existingUsers =
                userRepository.findAllByEmail(req.getEmail());

        User existingActiveUser = existingUsers.stream()
                .filter(User::isActive)
                .findFirst()
                .orElse(null);

        if (existingActiveUser != null && existingActiveUser.isVerified()) {
            throw new DuplicateResourceException("Email already registered");
        }

        Role role;
        try {
            role = req.getRole() != null && !req.getRole().isBlank()
                    ? Role.valueOf(req.getRole().toLowerCase())
                    : Role.student;
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role: " + req.getRole());
        }

        User user = existingActiveUser;

        if (user == null) {
            user = User.builder()
                    .name(req.getName())
                    .email(req.getEmail())
                    .passwordHash(passwordEncoder.encode(req.getPassword()))
                    .role(role)
                    .build();
        } else {
            user.setName(req.getName());
            user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
            user.setRole(role);
        }

        User saved = userRepository.save(user);

        otpService.sendOtp(saved.getEmail(), "REGISTER");

        String token = generateToken(saved);

        return AuthResponse.builder()
                .token(token)
                .user(UserResponse.from(saved))
                .build();
    }

    public AuthResponse login(LoginRequest req) {

        User user = userRepository.findAllByEmail(req.getEmail())
                .stream()
                .filter(User::isActive)
                .findFirst()
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid email or password"));

        if (!user.isVerified()) {
            throw new UnauthorizedException(
                    "Please verify your email before logging in.");
        }

        if (!user.isActive()) {
            throw new UnauthorizedException(
                    "Your account has been deactivated.");
        }

        if (!passwordEncoder.matches(
                req.getPassword(),
                user.getPasswordHash())) {

            throw new UnauthorizedException(
                    "Invalid email or password");
        }

        String token = generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .user(UserResponse.from(user))
                .build();
    }

    public ApiResponse forgotPassword(ForgotPasswordRequest req) {

        User user = userRepository.findAllByEmail(req.getEmail())
                .stream()
                .filter(User::isActive)
                .findFirst()
                .orElseThrow(() ->
                        new BadRequestException("User not found"));

        otpService.sendOtp(user.getEmail(), "FORGOT_PASSWORD");

        return ApiResponse.of(
                "OTP sent successfully to your email.");
    }

    public ApiResponse verifyOtp(VerifyOtpRequest req) {

        boolean verified = otpService.verifyOtp(
                req.getEmail(),
                req.getOtp(),
                "REGISTER"
        );

        if (!verified) {
            throw new BadRequestException(
                    "Invalid or expired OTP");
        }

        User user = userRepository.findAllByEmail(req.getEmail())
                .stream()
                .filter(User::isActive)
                .findFirst()
                .orElseThrow(() ->
                        new BadRequestException("User not found"));

        user.setVerified(true);
        userRepository.save(user);

        return ApiResponse.of(
                "OTP verified successfully.");
    }

    public ApiResponse verifyForgotPasswordOtp(
            VerifyOtpRequest req) {

        boolean verified = otpService.verifyOtp(
                req.getEmail(),
                req.getOtp(),
                "FORGOT_PASSWORD"
        );

        if (!verified) {
            throw new BadRequestException(
                    "Invalid or expired OTP");
        }

        return ApiResponse.of(
                "OTP verified successfully.");
    }

    public ApiResponse resetPassword(
            ResetPasswordRequest req) {

        User user = userRepository.findAllByEmail(req.getEmail())
                .stream()
                .filter(User::isActive)
                .findFirst()
                .orElseThrow(() ->
                        new BadRequestException("User not found"));

        Otp otp = otpRepository
                .findTopByEmailAndPurposeOrderByIdDesc(
                        req.getEmail(),
                        "FORGOT_PASSWORD"
                )
                .orElseThrow(() ->
                        new BadRequestException("OTP not found"));

        if (!otp.isVerified()) {
            throw new BadRequestException(
                    "Please verify OTP before resetting password.");
        }

        user.setPasswordHash(
                passwordEncoder.encode(req.getNewPassword()));

        userRepository.save(user);

        otp.setVerified(false);
        otpRepository.save(otp);

        return ApiResponse.of(
                "Password reset successfully.");
    }

    private String generateToken(User user) {

        UserDetails ud = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        )
                )
        );

        return jwtUtil.generateToken(
                ud,
                user.getId(),
                user.getRole().name()
        );
    }
}