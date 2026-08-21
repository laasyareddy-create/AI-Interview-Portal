package com.interviewportal.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateMockInterviewQuestionRequest {

    @NotBlank(message = "Question type is required")
    private String type;

    @NotBlank(message = "Question is required")
    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private String sampleInput;

    private String sampleOutput;
}