package com.interviewportal.dto.ai;

import lombok.Data;

import java.util.List;

@Data
public class AiEvaluationResponse {

    private Double score;

    private String correctness;

    private String feedback;

    private List<String> strengths;

    private List<String> improvements;
}