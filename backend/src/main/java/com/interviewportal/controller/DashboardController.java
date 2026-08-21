package com.interviewportal.controller;

import com.interviewportal.dto.response.DashboardResponse;
import com.interviewportal.security.JwtUtil;
import com.interviewportal.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('student')")
public class DashboardController {

    private final DashboardService dashboardService;
    private final JwtUtil jwtUtil;

    /**
     * GET /api/dashboard
     * Returns the student dashboard summary.
     * Used by Dashboard.jsx
     * Response shape:
     *   { welcomeName, upcomingInterviews, completedAssessments,
     *     overallScore, practiceStreakDays, recentAttempts:[...] }
     */
    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(
            @RequestHeader("Authorization") String authHeader) {
        Long studentId = jwtUtil.extractUserId(authHeader.substring(7));
        return ResponseEntity.ok(dashboardService.getDashboard(studentId));
    }
}
