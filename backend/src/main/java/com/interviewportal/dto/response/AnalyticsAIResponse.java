package com.interviewportal.dto.ai;

import lombok.Data;

import java.util.List;

@Data
public class AnalyticsAIResponse {

    private String overallFeedback;

    private List<String> strengths;

    private List<String> improvements;

}