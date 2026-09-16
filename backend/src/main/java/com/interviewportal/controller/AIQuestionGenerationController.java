package com.interviewportal.controller;

import com.interviewportal.dto.request.GenerateAssessmentAIRequest;
import com.interviewportal.dto.request.GenerateMockInterviewAIRequest;
import com.interviewportal.dto.response.AssessmentResponse;
import com.interviewportal.dto.response.MockInterviewTemplateResponse;
import com.interviewportal.service.AIQuestionGenerationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/ai")
@RequiredArgsConstructor
public class AIQuestionGenerationController {

    private final AIQuestionGenerationService aiQuestionGenerationService;


    // ============================================================
    // GENERATE ASSESSMENT
    // ============================================================

    @PostMapping("/assessments/generate")
    public ResponseEntity<AssessmentResponse> generateAssessment(
            @Valid @RequestBody GenerateAssessmentAIRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        aiQuestionGenerationService
                                .generateAssessment(request)
                );
    }


    // ============================================================
    // GENERATE MOCK INTERVIEW
    // ============================================================

    @PostMapping("/mock-interviews/generate")
    public ResponseEntity<MockInterviewTemplateResponse> generateMockInterview(
            @Valid @RequestBody GenerateMockInterviewAIRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        aiQuestionGenerationService
                                .generateMockInterview(request)
                );
    }
}