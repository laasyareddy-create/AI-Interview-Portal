package com.interviewportal.service;

import com.interviewportal.repository.MockInterviewAnswerRepository;
import com.interviewportal.dto.request.CreateMockInterviewQuestionRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.MockInterviewQuestionResponse;
import com.interviewportal.entity.MockInterviewQuestion;
import com.interviewportal.entity.MockInterviewTemplate;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.MockInterviewQuestionRepository;
import com.interviewportal.repository.MockInterviewTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MockInterviewQuestionService {

    private final MockInterviewQuestionRepository questionRepository;

    private final MockInterviewTemplateRepository interviewRepository;

    private final MockInterviewAnswerRepository answerRepository;

    public List<MockInterviewQuestionResponse> getQuestions(
            Long interviewId
    ) {

        return questionRepository
                .findByMockInterviewIdOrderByIdAsc(interviewId)
                .stream()
                .map(MockInterviewQuestionResponse::from)
                .toList();
    }

    public MockInterviewQuestionResponse addQuestion(
            Long interviewId,
            CreateMockInterviewQuestionRequest req
    ) {

        MockInterviewTemplate interview =
                interviewRepository.findById(interviewId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mock Interview not found"));

        MockInterviewQuestion question =
                MockInterviewQuestion.builder()
                        .mockInterview(interview)
                        .type(req.getType())
                        .question(req.getQuestion())
                        .optionA(req.getOptionA())
                        .optionB(req.getOptionB())
                        .optionC(req.getOptionC())
                        .optionD(req.getOptionD())
                        .correctAnswer(req.getCorrectAnswer())
                        .sampleInput(req.getSampleInput())
                        .sampleOutput(req.getSampleOutput())
                        .build();

        return MockInterviewQuestionResponse.from(
                questionRepository.save(question)
        );
    }

    public MockInterviewQuestionResponse updateQuestion(
            Long id,
            CreateMockInterviewQuestionRequest req
    ) {

        MockInterviewQuestion question =
                questionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Question not found"));

        question.setType(req.getType());
        question.setQuestion(req.getQuestion());
        question.setOptionA(req.getOptionA());
        question.setOptionB(req.getOptionB());
        question.setOptionC(req.getOptionC());
        question.setOptionD(req.getOptionD());
        question.setCorrectAnswer(req.getCorrectAnswer());
        question.setSampleInput(req.getSampleInput());
        question.setSampleOutput(req.getSampleOutput());

        return MockInterviewQuestionResponse.from(
                questionRepository.save(question)
        );
    }

    public ApiResponse deleteQuestion(Long id) {

        if (!questionRepository.existsById(id)) {

            throw new ResourceNotFoundException(
                    "Question not found"
            );

        }

        answerRepository.deleteByQuestion_Id(id);

        questionRepository.deleteById(id);

        return ApiResponse.of(
                "Question deleted successfully"
        );

    }

}