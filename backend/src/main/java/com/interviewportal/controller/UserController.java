package com.interviewportal.controller;

import com.interviewportal.dto.request.UpdateRoleRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.UserResponse;
import com.interviewportal.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('admin')")
public class UserController {

    private final UserService userService;

    /**
     * GET /api/users
     * Returns all registered users (admin only).
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * PATCH /api/users/{id}/role
     * Body: { role }
     */
    @PatchMapping("/{id}/role")
    public ResponseEntity<UserResponse> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRoleRequest req) {
        return ResponseEntity.ok(userService.updateRole(id, req));
    }

    /**
     * DELETE /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
