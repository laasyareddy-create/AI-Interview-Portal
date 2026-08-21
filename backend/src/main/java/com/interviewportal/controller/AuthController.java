package com.interviewportal.controller;

import com.interviewportal.dto.request.ForgotPasswordRequest;
import com.interviewportal.dto.request.LoginRequest;
import com.interviewportal.dto.request.RegisterRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.AuthResponse;
import com.interviewportal.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.interviewportal.dto.request.VerifyOtpRequest;
import com.interviewportal.dto.request.ResetPasswordRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/register
     * Body: { name, email, password, role? }
     * Returns: { token, user }
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(req));
    }

    /**
     * POST /api/auth/login
     * Body: { email, password }
     * Returns: { token, user }
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    /**
     * POST /api/auth/forgot-password
     * Body: { email }
     * Returns: { message }
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        return ResponseEntity.ok(authService.forgotPassword(req));
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(authService.verifyOtp(request));
    }


    @PostMapping("/verify-forgot-password-otp")
    public ResponseEntity<ApiResponse> verifyForgotPasswordOtp(
            @Valid @RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(authService.verifyForgotPasswordOtp(request));
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        return ResponseEntity.ok(authService.resetPassword(request));
    }
}
