package com.interviewportal.controller;

import com.interviewportal.dto.request.SubmitAttemptRequest;
import com.interviewportal.dto.response.AttemptResponse;
import com.interviewportal.security.JwtUtil;
import com.interviewportal.service.AttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;
    private final JwtUtil jwtUtil;

    /**
     * GET /api/attempts
     * Returns the authenticated student's assessment history.
     * Used by Results.jsx and Analytics.jsx
     */
    @GetMapping
    public ResponseEntity<List<AttemptResponse>> getMyAttempts(
            @RequestHeader("Authorization") String authHeader) {
        Long studentId = extractUserId(authHeader);
        return ResponseEntity.ok(attemptService.getMyAttempts(studentId));
    }

    /**
     * POST /api/attempts
     * Body: { category, difficulty, score, totalQuestions, correctAnswers, wrongAnswers, percentage }
     * Called from AssessmentExam.jsx on submit.
     */
    @PostMapping
    public ResponseEntity<AttemptResponse> submit(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody SubmitAttemptRequest req) {
        Long studentId = extractUserId(authHeader);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(attemptService.submit(studentId, req));
    }

    /**
     * GET /api/attempts/all
     * Returns all student attempts (trainer + admin only).
     * Used by StudentResults.jsx and PerformanceReports.jsx
     */
    @GetMapping("/all")
    public ResponseEntity<List<AttemptResponse>> getAllAttempts() {
        return ResponseEntity.ok(attemptService.getAllAttempts());
    }

    private Long extractUserId(String authHeader) {
        return jwtUtil.extractUserId(authHeader.substring(7));
    }
}
