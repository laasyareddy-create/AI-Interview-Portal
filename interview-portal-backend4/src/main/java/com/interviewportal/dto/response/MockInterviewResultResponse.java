package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MockInterviewResultResponse {

    private Long interviewId;

    private String interviewName;

    private String category;

    private Integer totalQuestions;

    private Integer attempted;

    // MCQ Summary
    private Integer mcqCorrect;

    private Integer mcqTotal;

    // AI Summary
    private Integer descriptiveScore;

    private Integer codingScore;

    private List<MockInterviewAnswerResponse> answers;
}