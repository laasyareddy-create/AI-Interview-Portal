package com.interviewportal.controller;

import com.interviewportal.dto.response.AdminAnalyticsResponse;
import com.interviewportal.dto.response.AnalyticsResponse;
import com.interviewportal.security.JwtUtil;
import com.interviewportal.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final JwtUtil jwtUtil;

    /**
     * GET /api/analytics
     * Returns the authenticated student's personal analytics.
     * Used by Analytics.jsx
     * Response shape:
     *   { highestScore, averageScore, assessments, mockInterviews,
     *     scoreTrend:[{week,score}], skills:[{category,score}],
     *     technicalScore, hrScore, communicationScore,
     *     mockCategoryAnalytics:[{category,attempts,bestScore,avgScore}] }
     */
    @GetMapping
    public ResponseEntity<AnalyticsResponse> getStudentAnalytics(
            @RequestHeader("Authorization") String authHeader) {
        Long studentId = extractUserId(authHeader);
        return ResponseEntity.ok(analyticsService.getStudentAnalytics(studentId));
    }

    /**
     * GET /api/analytics/admin
     * Returns platform-wide statistics (admin only).
     * Used by AdminAnalytics.jsx
     * Response shape:
     *   { totalUsers, students, trainers, admins,
     *     totalAttempts, averageScore, highestScore, lowestScore,
     *     passRate, mostAttempted }
     */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<AdminAnalyticsResponse> getAdminAnalytics() {
        return ResponseEntity.ok(analyticsService.getAdminAnalytics());
    }

    private Long extractUserId(String authHeader) {
        return jwtUtil.extractUserId(authHeader.substring(7));
    }
}
