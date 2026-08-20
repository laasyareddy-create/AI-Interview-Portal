package com.interviewportal.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateResultRequest {

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
}