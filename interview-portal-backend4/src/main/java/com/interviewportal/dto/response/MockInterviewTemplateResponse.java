package com.interviewportal.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MockInterviewTemplateResponse {

    private Long id;
    private String name;
    private String category;
    private Integer duration;
    private LocalDateTime createdAt;
    private Integer totalQuestions;

}