package com.interviewportal.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MockInterviewAnswerRequest {

    @NotNull
    private Long questionId;

    private String studentAnswer;
}