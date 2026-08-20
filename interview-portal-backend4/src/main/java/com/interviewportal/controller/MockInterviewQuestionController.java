package com.interviewportal.controller;

import com.interviewportal.dto.request.CreateMockInterviewQuestionRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.MockInterviewQuestionResponse;
import com.interviewportal.service.MockInterviewQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/mock-interviews")
@RequiredArgsConstructor
public class MockInterviewQuestionController {

    private final MockInterviewQuestionService questionService;

    @GetMapping("/{interviewId}/questions")
    public ResponseEntity<List<MockInterviewQuestionResponse>> getQuestions(
            @PathVariable Long interviewId) {

        return ResponseEntity.ok(
                questionService.getQuestions(interviewId)
        );
    }

    @PostMapping("/{interviewId}/questions")
    public ResponseEntity<MockInterviewQuestionResponse> addQuestion(
            @PathVariable Long interviewId,
            @Valid @RequestBody CreateMockInterviewQuestionRequest req) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(questionService.addQuestion(interviewId, req));
    }

    @PutMapping("/questions/{questionId}")
    public ResponseEntity<MockInterviewQuestionResponse> updateQuestion(
            @PathVariable Long questionId,
            @Valid @RequestBody CreateMockInterviewQuestionRequest req) {

        return ResponseEntity.ok(
                questionService.updateQuestion(questionId, req)
        );
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse> deleteQuestion(
            @PathVariable Long questionId) {

        return ResponseEntity.ok(
                questionService.deleteQuestion(questionId)
        );
    }
}