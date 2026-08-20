package com.interviewportal.dto.response;

import com.interviewportal.entity.AssessmentAttempt;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AttemptResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String category;
    private String difficulty;
    private int score;
    private int totalQuestions;
    private int correctAnswers;
    private int wrongAnswers;
    private double percentage;
    private LocalDateTime attemptedAt;

    public static AttemptResponse from(AssessmentAttempt a) {
        return AttemptResponse.builder()
                .id(a.getId())
                .studentId(a.getStudent().getId())
                .studentName(a.getStudentName())
                .studentEmail(a.getStudentEmail())
                .category(a.getCategory())
                .difficulty(a.getDifficulty())
                .score(a.getScore())
                .totalQuestions(a.getTotalQuestions())
                .correctAnswers(a.getCorrectAnswers())
                .wrongAnswers(a.getWrongAnswers())
                .percentage(a.getPercentage())
                .attemptedAt(a.getAttemptedAt())
                .build();
    }
}
