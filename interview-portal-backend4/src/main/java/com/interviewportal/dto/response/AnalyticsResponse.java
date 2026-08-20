package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsResponse {
    private int highestScore;
    private int averageScore;
    private int assessments;
    private int mockInterviews;
    private List<ScoreTrend> scoreTrend;
    private List<SkillScore> skills;
    private List<MockCategoryAnalytic> mockCategoryAnalytics;
    private List<String> strengths;
    private List<String> improvements;
    private String overallFeedback;

    @Data
    @Builder
    public static class ScoreTrend {
        private String week;
        private double score;
    }

    @Data
    @Builder
    public static class SkillScore {
        private String category;
        private double score;
    }

    @Data
    @Builder
    public static class MockCategoryAnalytic {
        private String category;
        private int attempts;
        private double bestScore;
        private double avgScore;
    }
}
