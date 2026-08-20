package com.interviewportal.dto.response;

import com.interviewportal.entity.Result;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultResponse {

    private Long id;

    private Long studentId;

    private String studentName;

    private String studentEmail;

    private Long assessmentId;

    private String assessmentName;

    private String category;

    private String difficulty;

    private Integer score;

    private Integer correctAnswers;

    private Integer wrongAnswers;

    private Integer totalQuestions;

    private Integer percentage;

    private LocalDateTime attemptedAt;

    public static ResultResponse from(Result result) {

        return ResultResponse.builder()
                .id(result.getId())
                .studentId(result.getStudentId())
                .studentName(result.getStudentName())
                .studentEmail(result.getStudentEmail())
                .assessmentId(result.getAssessmentId())
                .assessmentName(result.getAssessmentName())
                .category(result.getCategory())
                .difficulty(result.getDifficulty())
                .score(result.getScore())
                .correctAnswers(result.getCorrectAnswers())
                .wrongAnswers(result.getWrongAnswers())
                .totalQuestions(result.getTotalQuestions())
                .percentage(result.getPercentage())
                .attemptedAt(result.getAttemptedAt())
                .build();
    }
}