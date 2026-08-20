package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DashboardResponse {

    private String welcomeName;

    private int upcomingInterviews;

    private int completedAssessments;

    private double overallScore;

    private int practiceStreakDays;

    private boolean assessmentToday;

    private boolean mockInterviewToday;

    private List<AttemptResponse> recentAttempts;

    private List<MockInterviewResponse> recentMockInterviews;

    private List<String> recommendedPracticeAreas;
}