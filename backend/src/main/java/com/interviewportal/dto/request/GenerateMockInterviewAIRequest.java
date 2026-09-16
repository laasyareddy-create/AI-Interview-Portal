package com.interviewportal.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class GenerateMockInterviewAIRequest {

    @NotBlank(message = "Interview name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Number of questions is required")
    @Min(value = 1, message = "Number of questions must be at least 1")
    @Max(value = 50, message = "Number of questions cannot exceed 50")
    private Integer numberOfQuestions;

    @NotEmpty(message = "At least one question type is required")
    private List<String> questionTypes;

    @NotEmpty(message = "Question distribution is required")
    private Map<String, Integer> questionCounts;

    // AI-generated mock interviews currently use the standard 30-minute duration.
    private Integer duration = 30;
}