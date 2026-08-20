package com.interviewportal.service;

import com.interviewportal.dto.response.SubmitMockInterviewResponse;
import com.interviewportal.dto.response.MockInterviewAnswerResponse;
import com.interviewportal.dto.response.MockInterviewResultResponse;
import com.interviewportal.dto.request.MockInterviewAnswerRequest;
import com.interviewportal.dto.request.SubmitMockInterviewRequest;
import com.interviewportal.dto.response.MockInterviewResponse;
import com.interviewportal.entity.MockInterview;
import com.interviewportal.entity.MockInterviewAnswer;
import com.interviewportal.entity.MockInterviewQuestion;
import com.interviewportal.entity.MockInterviewTemplate;
import com.interviewportal.entity.User;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.MockInterviewAnswerRepository;
import com.interviewportal.repository.MockInterviewQuestionRepository;
import com.interviewportal.repository.MockInterviewRepository;
import com.interviewportal.repository.MockInterviewTemplateRepository;
import com.interviewportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MockInterviewService {

    private final MockInterviewRepository mockInterviewRepository;
    private final MockInterviewAnswerRepository mockInterviewAnswerRepository;
    private final MockInterviewQuestionRepository mockInterviewQuestionRepository;
    private final MockInterviewTemplateRepository mockInterviewTemplateRepository;
    private final UserRepository userRepository;
    private final AIEvaluationService aiEvaluationService;

    public List<MockInterviewResponse> getMy(Long studentId) {

        return mockInterviewRepository
                .findByStudentIdOrderByCompletedAtDesc(studentId)
                .stream()
                .map(MockInterviewResponse::from)
                .toList();
    }

    public SubmitMockInterviewResponse submit(
            Long studentId,
            SubmitMockInterviewRequest req
    ) {

        User student =
                userRepository.findById(studentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("User not found"));

        MockInterviewTemplate template =
                mockInterviewTemplateRepository
                        .findById(req.getInterviewId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Interview template not found"));

        MockInterview interview =
                MockInterview.builder()
                        .student(student)
                        .studentName(student.getName())
                        .category(req.getCategory())
                        .template(template)
                        .attempted(req.getAttempted())
                        .totalQuestions(req.getTotalQuestions())
                        .score(req.getScore())
                        .percentage(req.getPercentage())
                        .build();

        interview = mockInterviewRepository.save(interview);

        int totalAiScore = 0;
        int evaluatedQuestions = 0;

        for (MockInterviewAnswerRequest answerRequest : req.getAnswers()) {

            MockInterviewQuestion question =
                    mockInterviewQuestionRepository
                            .findById(answerRequest.getQuestionId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Question not found: "
                                                    + answerRequest.getQuestionId()
                                    ));

            MockInterviewAnswer answer =
                    MockInterviewAnswer.builder()
                            .mockInterview(interview)
                            .question(question)
                            .studentAnswer(answerRequest.getStudentAnswer())
                            .build();

            aiEvaluationService.evaluate(
                    question,
                    answer
            );

            mockInterviewAnswerRepository.save(answer);

            if (answer.getAiScore() != null) {

                totalAiScore += answer.getAiScore();
                evaluatedQuestions++;

            }
        }

        if (evaluatedQuestions > 0) {

            int averageScore =
                    Math.round((float) totalAiScore / evaluatedQuestions);

            interview.setScore(averageScore);

            interview.setPercentage(
                    averageScore * 10.0
            );

            mockInterviewRepository.save(interview);
        }

        return new SubmitMockInterviewResponse(
                interview.getId()
        );
    }

    public MockInterviewResultResponse getResult(Long interviewId) {

        MockInterview interview =
                mockInterviewRepository.findById(interviewId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Interview not found"));

        List<MockInterviewAnswerResponse> answers =
                mockInterviewAnswerRepository
                        .findByMockInterviewId(interviewId)
                        .stream()
                        .map(MockInterviewAnswerResponse::from)
                        .toList();

        int mcqCorrect = 0;
        int mcqTotal = 0;

        int descriptiveTotal = 0;
        int descriptiveCount = 0;

        int codingTotal = 0;
        int codingCount = 0;

        for (MockInterviewAnswerResponse answer : answers) {

            String type = answer.getQuestionType();

            if ("MCQ".equalsIgnoreCase(type)) {

                mcqTotal++;

                if (answer.getStudentAnswer() != null
                        && answer.getCorrectAnswer() != null
                        && answer.getStudentAnswer().equalsIgnoreCase(answer.getCorrectAnswer())) {

                    mcqCorrect++;
                }
            }

            else if ("DESCRIPTIVE".equalsIgnoreCase(type)) {

                if (answer.getAiScore() != null) {

                    descriptiveTotal += answer.getAiScore();
                    descriptiveCount++;

                }
            }

            else if ("CODING".equalsIgnoreCase(type)) {

                if (answer.getAiScore() != null) {

                    codingTotal += answer.getAiScore();
                    codingCount++;

                }
            }
        }

        Integer descriptiveScore =
                descriptiveCount == 0
                        ? null
                        : Math.round((float) descriptiveTotal / descriptiveCount);

        Integer codingScore =
                codingCount == 0
                        ? null
                        : Math.round((float) codingTotal / codingCount);

        System.out.println("Descriptive Score = " + descriptiveScore);
        System.out.println("Coding Score = " + codingScore);

        return MockInterviewResultResponse.builder()
                .interviewId(interview.getId())
                .interviewName(interview.getTemplate().getName())
                .category(interview.getCategory())
                .totalQuestions(interview.getTotalQuestions())
                .attempted(interview.getAttempted())

                .mcqCorrect(mcqCorrect)
                .mcqTotal(mcqTotal)

                .descriptiveScore(descriptiveScore)
                .codingScore(codingScore)

                .answers(answers)
                .build();
    }

    public List<MockInterviewResponse> getAll() {

        return mockInterviewRepository
                .findAllByOrderByCompletedAtDesc()
                .stream()
                .map(MockInterviewResponse::from)
                .toList();
    }
}