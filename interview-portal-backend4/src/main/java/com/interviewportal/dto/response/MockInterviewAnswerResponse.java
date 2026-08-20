package com.interviewportal.dto.response;

import com.interviewportal.entity.MockInterviewAnswer;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MockInterviewAnswerResponse {

    private Long questionId;

    private String question;

    private String questionType;

    // MCQ Options
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    // Correct Answer (MCQ only)
    private String correctAnswer;

    // Coding
    private String sampleInput;
    private String sampleOutput;

    // Student Answer
    private String studentAnswer;

    // AI Evaluation
    private Integer aiScore;

    private String correctness;

    private String feedback;

    private String strengths;

    private String improvements;

    public static MockInterviewAnswerResponse from(
            MockInterviewAnswer answer
    ) {

        return MockInterviewAnswerResponse.builder()
                .questionId(answer.getQuestion().getId())
                .question(answer.getQuestion().getQuestion())
                .questionType(answer.getQuestion().getType())

                .optionA(answer.getQuestion().getOptionA())
                .optionB(answer.getQuestion().getOptionB())
                .optionC(answer.getQuestion().getOptionC())
                .optionD(answer.getQuestion().getOptionD())

                .correctAnswer(answer.getQuestion().getCorrectAnswer())

                .sampleInput(answer.getQuestion().getSampleInput())
                .sampleOutput(answer.getQuestion().getSampleOutput())

                .studentAnswer(answer.getStudentAnswer())

                .aiScore(answer.getAiScore())
                .correctness(answer.getCorrectness())
                .feedback(answer.getFeedback())
                .strengths(answer.getStrengths())
                .improvements(answer.getImprovements())
                .build();
    }
}