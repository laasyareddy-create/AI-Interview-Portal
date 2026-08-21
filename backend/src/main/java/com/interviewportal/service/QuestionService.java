package com.interviewportal.service;

import com.interviewportal.dto.request.CreateQuestionRequest;
import com.interviewportal.dto.response.QuestionResponse;
import com.interviewportal.entity.Assessment;
import com.interviewportal.entity.Question;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.AssessmentRepository;
import com.interviewportal.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AssessmentRepository assessmentRepository;

    public QuestionResponse create(CreateQuestionRequest request) {

        Assessment assessment = assessmentRepository.findById(request.getAssessmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found"));

        Question question = Question.builder()
                .question(request.getQuestion())
                .optionA(request.getOptionA())
                .optionB(request.getOptionB())
                .optionC(request.getOptionC())
                .optionD(request.getOptionD())
                .correctAnswer(request.getCorrectAnswer())
                .marks(request.getMarks())
                .assessment(assessment)
                .build();

        return QuestionResponse.from(questionRepository.save(question));
    }

    public List<QuestionResponse> getAllByAssessment(Long assessmentId) {

        return questionRepository.findByAssessmentId(assessmentId)
                .stream()
                .map(QuestionResponse::from)
                .toList();
    }

    public QuestionResponse getById(Long id) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        return QuestionResponse.from(question);
    }

    public QuestionResponse update(Long id, CreateQuestionRequest request) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        Assessment assessment = assessmentRepository.findById(request.getAssessmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found"));

        question.setQuestion(request.getQuestion());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());
        question.setMarks(request.getMarks());
        question.setAssessment(assessment);

        return QuestionResponse.from(questionRepository.save(question));
    }

    public void delete(Long id) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));

        questionRepository.delete(question);
    }
}