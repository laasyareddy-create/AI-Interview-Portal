package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminAnalyticsResponse {
    private long totalUsers;
    private long students;
    private long trainers;
    private long admins;
    private int totalAttempts;
    private double averageScore;
    private double highestScore;
    private double lowestScore;
    private double passRate;
    private String mostAttempted;
}
