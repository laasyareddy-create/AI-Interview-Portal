package com.interviewportal.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class SubmitMockInterviewRequest {

    @NotBlank(message = "Category is required")
    private String category;

    @Valid
    @NotEmpty(message = "Answers are required")
    private List<MockInterviewAnswerRequest> answers;

    // Temporary (will be removed after AI scoring is completed)
    private Integer attempted;

    private Integer totalQuestions;

    private Integer score;

    private Double percentage;

    private Long interviewId;
}