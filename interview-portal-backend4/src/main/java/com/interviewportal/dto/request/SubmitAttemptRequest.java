package com.interviewportal.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubmitAttemptRequest {

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @NotNull
    @Min(0)
    private Integer score;

    @NotNull
    @Min(1)
    private Integer totalQuestions;

    @NotNull
    @Min(0)
    private Integer correctAnswers;

    @NotNull
    @Min(0)
    private Integer wrongAnswers;

    @NotNull
    private Double percentage;
}
