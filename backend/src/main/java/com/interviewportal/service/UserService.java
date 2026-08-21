package com.interviewportal.service;

import com.interviewportal.dto.request.UpdateRoleRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.UserResponse;
import com.interviewportal.entity.User;
import com.interviewportal.enums.Role;
import com.interviewportal.exception.BadRequestException;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findByActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    public UserResponse updateRole(Long userId, UpdateRoleRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Role role;
        try {
            role = Role.valueOf(req.getRole().toLowerCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role: " + req.getRole());
        }

        user.setRole(role);
        User saved = userRepository.save(user);
        return UserResponse.from(saved);
    }

    public ApiResponse deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setActive(false);

        userRepository.save(user);

        return ApiResponse.of("User deactivated successfully");
    }
}
