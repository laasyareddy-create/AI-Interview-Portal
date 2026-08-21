package com.interviewportal.dto.response;

import com.interviewportal.entity.Assessment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AssessmentResponse {

    private Long id;
    private String name;
    private String category;
    private String difficulty;
    private Integer duration;
    private Integer questionCount;
    private LocalDateTime createdAt;

    public static AssessmentResponse from(Assessment assessment) {
        return AssessmentResponse.builder()
                .id(assessment.getId())
                .name(assessment.getName())
                .category(assessment.getCategory())
                .difficulty(assessment.getDifficulty())
                .duration(assessment.getDuration())
                .questionCount(
                        assessment.getQuestions() != null
                                ? assessment.getQuestions().size()
                                : 0
                )
                .createdAt(assessment.getCreatedAt())
                .build();
    }
}