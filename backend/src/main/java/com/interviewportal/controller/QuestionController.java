package com.interviewportal.controller;

import com.interviewportal.dto.request.CreateQuestionRequest;
import com.interviewportal.dto.response.QuestionResponse;
import com.interviewportal.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<QuestionResponse> create(
            @Valid @RequestBody CreateQuestionRequest request) {

        return ResponseEntity.ok(questionService.create(request));
    }

    @GetMapping("/assessment/{assessmentId}")
    public ResponseEntity<List<QuestionResponse>> getAllByAssessment(
            @PathVariable Long assessmentId) {

        return ResponseEntity.ok(questionService.getAllByAssessment(assessmentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(questionService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CreateQuestionRequest request) {

        return ResponseEntity.ok(questionService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        questionService.delete(id);
        return ResponseEntity.ok("Question deleted successfully.");
    }
}