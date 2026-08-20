package com.interviewportal.dto.response;

import com.interviewportal.entity.MockInterviewQuestion;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MockInterviewQuestionResponse {

    private Long id;

    private String type;

    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;

    private String sampleInput;

    private String sampleOutput;

    public static MockInterviewQuestionResponse from(
            MockInterviewQuestion question
    ) {

        return MockInterviewQuestionResponse.builder()
                .id(question.getId())
                .type(question.getType())
                .question(question.getQuestion())
                .optionA(question.getOptionA())
                .optionB(question.getOptionB())
                .optionC(question.getOptionC())
                .optionD(question.getOptionD())
                .correctAnswer(question.getCorrectAnswer())
                .sampleInput(question.getSampleInput())
                .sampleOutput(question.getSampleOutput())
                .build();
    }
}