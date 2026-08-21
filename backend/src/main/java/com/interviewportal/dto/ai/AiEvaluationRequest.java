package com.interviewportal.dto.ai;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AiEvaluationRequest {

    private String questionType;

    private String question;

    private String studentAnswer;

    private String sampleInput;

    private String sampleOutput;
}