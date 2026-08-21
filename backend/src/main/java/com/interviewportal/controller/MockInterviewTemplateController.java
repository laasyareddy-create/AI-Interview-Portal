package com.interviewportal.controller;

import com.interviewportal.dto.request.CreateMockInterviewRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.MockInterviewTemplateResponse;
import com.interviewportal.service.MockInterviewTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MockInterviewTemplateController {

    private final MockInterviewTemplateService mockInterviewTemplateService;

    // =========================
    // ADMIN ENDPOINTS
    // =========================

    @GetMapping("/admin/mock-interviews")
    public ResponseEntity<List<MockInterviewTemplateResponse>> getAll() {

        return ResponseEntity.ok(
                mockInterviewTemplateService.getAll()
        );
    }

    @PostMapping("/admin/mock-interviews")
    public ResponseEntity<MockInterviewTemplateResponse> create(
            @Valid @RequestBody CreateMockInterviewRequest req) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(mockInterviewTemplateService.create(req));
    }

    @GetMapping("/admin/mock-interviews/{id}")
    public ResponseEntity<MockInterviewTemplateResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mockInterviewTemplateService.getById(id)
        );
    }

    @PutMapping("/admin/mock-interviews/{id}")
    public ResponseEntity<MockInterviewTemplateResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CreateMockInterviewRequest req) {

        return ResponseEntity.ok(
                mockInterviewTemplateService.update(id, req)
        );
    }

    @DeleteMapping("/admin/mock-interviews/{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mockInterviewTemplateService.delete(id)
        );
    }

    // =========================
    // STUDENT ENDPOINTS
    // =========================

    @GetMapping("/mock-interview-templates/category/{category}")
    public ResponseEntity<List<MockInterviewTemplateResponse>> getByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                mockInterviewTemplateService.getByCategory(category)
        );
    }

    @GetMapping("/mock-interview-templates/{id}")
    public ResponseEntity<MockInterviewTemplateResponse> getStudentInterview(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mockInterviewTemplateService.getById(id)
        );
    }
}