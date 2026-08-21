package com.interviewportal.controller;

import com.interviewportal.dto.response.SubmitMockInterviewResponse;
import com.interviewportal.dto.request.SubmitMockInterviewRequest;
import com.interviewportal.dto.response.MockInterviewResponse;
import com.interviewportal.dto.response.MockInterviewResultResponse;
import com.interviewportal.security.JwtUtil;
import com.interviewportal.service.MockInterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mock-interviews")
@RequiredArgsConstructor
public class MockInterviewController {

    private final MockInterviewService mockInterviewService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<MockInterviewResponse>> getMy(
            @RequestHeader("Authorization") String authHeader) {

        Long studentId = extractUserId(authHeader);

        return ResponseEntity.ok(
                mockInterviewService.getMy(studentId)
        );
    }

    @PostMapping
    public ResponseEntity<SubmitMockInterviewResponse> submit(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody SubmitMockInterviewRequest req) {

        Long studentId = extractUserId(authHeader);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        mockInterviewService.submit(
                                studentId,
                                req
                        )
                );
    }

    // ===========================
    // NEW API
    // ===========================

    @GetMapping("/{id}")
    public ResponseEntity<MockInterviewResultResponse> getResult(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                mockInterviewService.getResult(id)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<MockInterviewResponse>> getAll() {

        return ResponseEntity.ok(
                mockInterviewService.getAll()
        );
    }

    private Long extractUserId(String authHeader) {

        return jwtUtil.extractUserId(
                authHeader.substring(7)
        );

    }
}