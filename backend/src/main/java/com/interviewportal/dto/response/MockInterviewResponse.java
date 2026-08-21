package com.interviewportal.dto.response;

import com.interviewportal.entity.MockInterview;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MockInterviewResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String category;
    private int attempted;
    private int totalQuestions;
    private int score;
    private double percentage;
    private LocalDateTime completedAt;

    public static MockInterviewResponse from(MockInterview m) {
        return MockInterviewResponse.builder()
                .id(m.getId())
                .studentId(m.getStudent().getId())
                .studentName(m.getStudentName())
                .category(m.getCategory())
                .attempted(m.getAttempted())
                .totalQuestions(m.getTotalQuestions())
                .score(m.getScore())
                .percentage(m.getPercentage())
                .completedAt(m.getCompletedAt())
                .build();
    }
}
