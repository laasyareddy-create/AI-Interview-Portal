package com.interviewportal.controller;

import com.interviewportal.dto.request.ChangePasswordRequest;
import com.interviewportal.dto.request.UpdateProfileRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.UserResponse;
import com.interviewportal.security.JwtUtil;
import com.interviewportal.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final JwtUtil jwtUtil;

    /**
     * GET /api/profile
     * Returns the authenticated user's profile.
     */
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    /**
     * PUT /api/profile
     * Body: { name, email?, contactNumber?, about?, skills?, resumeLink?, profileImage? }
     */
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UpdateProfileRequest req) {
        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(profileService.updateProfile(userId, req));
    }

    /**
     * PUT /api/profile/password
     * Body: { currentPassword, newPassword, confirmPassword }
     */
    @PutMapping("/profile/password")
    public ResponseEntity<ApiResponse> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ChangePasswordRequest req) {
        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(profileService.changePassword(userId, req));
    }

    private Long extractUserId(String authHeader) {
        String token = authHeader.substring(7);
        return jwtUtil.extractUserId(token);
    }
}
