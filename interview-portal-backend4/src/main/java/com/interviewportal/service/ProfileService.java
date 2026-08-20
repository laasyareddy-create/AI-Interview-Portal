package com.interviewportal.service;

import com.interviewportal.dto.request.ChangePasswordRequest;
import com.interviewportal.dto.request.UpdateProfileRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.UserResponse;
import com.interviewportal.entity.User;
import com.interviewportal.exception.BadRequestException;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getProfile(Long userId) {
        User user = findUser(userId);
        return UserResponse.from(user);
    }

    public UserResponse updateProfile(Long userId, UpdateProfileRequest req) {
        User user = findUser(userId);

        user.setName(req.getName());
        if (req.getContactNumber() != null) user.setContactNumber(req.getContactNumber());
        if (req.getAbout()         != null) user.setAbout(req.getAbout());
        if (req.getSkills()        != null) user.setSkills(req.getSkills());
        if (req.getResumeLink()    != null) user.setResumeLink(req.getResumeLink());
        if (req.getProfileImage()  != null) user.setProfileImage(req.getProfileImage());

        User saved = userRepository.save(user);
        return UserResponse.from(saved);
    }

    public ApiResponse changePassword(Long userId, ChangePasswordRequest req) {
        if (!req.getNewPassword().equals(req.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        User user = findUser(userId);

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        return ApiResponse.of("Password updated successfully");
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
