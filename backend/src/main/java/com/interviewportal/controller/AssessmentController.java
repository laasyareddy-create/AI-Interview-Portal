package com.interviewportal.controller;

import com.interviewportal.dto.request.CreateAssessmentRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.AssessmentResponse;
import com.interviewportal.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @GetMapping
    public ResponseEntity<List<AssessmentResponse>> getAll() {
        return ResponseEntity.ok(assessmentService.getAll());
    }

    // ⭐ NEW FILTER ENDPOINT
    @GetMapping("/filter")
    public ResponseEntity<List<AssessmentResponse>> filterAssessments(
            @RequestParam String category,
            @RequestParam String difficulty) {

        return ResponseEntity.ok(
                assessmentService.filterAssessments(category, difficulty)
        );
    }

    @PostMapping
    public ResponseEntity<AssessmentResponse> create(
            @Valid @RequestBody CreateAssessmentRequest req) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(assessmentService.create(req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {

        return ResponseEntity.ok(
                assessmentService.delete(id)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResponse> getById(@PathVariable Long id) {

        return ResponseEntity.ok(
                assessmentService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssessmentResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CreateAssessmentRequest req) {

        return ResponseEntity.ok(
                assessmentService.update(id, req)
        );
    }
}