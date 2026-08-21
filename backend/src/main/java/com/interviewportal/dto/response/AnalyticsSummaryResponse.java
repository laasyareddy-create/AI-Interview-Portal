package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsSummaryResponse {

    private String overallFeedback;

    private List<String> strengths;

    private List<String> improvements;

}