package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PerformanceReportResponse {
    private String studentName;
    private String studentEmail;
    private double average;
    private double highest;
    private double lowest;
    private int totalAttempts;
    private String performanceLevel;
    private String bestCategory;
    private int mockInterviewsTaken;
    private double avgMockScore;
    private double bestMockScore;
    private List<AttemptResponse> assessmentHistory;
}
