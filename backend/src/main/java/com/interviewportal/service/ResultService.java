package com.interviewportal.service;

import com.interviewportal.dto.request.CreateResultRequest;
import com.interviewportal.dto.response.ResultResponse;
import com.interviewportal.entity.Result;
import com.interviewportal.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;

    public ResultResponse saveResult(CreateResultRequest request) {

        Result result = Result.builder()
                .studentId(request.getStudentId())
                .studentName(request.getStudentName())
                .studentEmail(request.getStudentEmail())
                .assessmentId(request.getAssessmentId())
                .assessmentName(request.getAssessmentName())
                .category(request.getCategory())
                .difficulty(request.getDifficulty())
                .score(request.getScore())
                .correctAnswers(request.getCorrectAnswers())
                .wrongAnswers(request.getWrongAnswers())
                .totalQuestions(request.getTotalQuestions())
                .percentage(request.getPercentage())
                .build();

        return ResultResponse.from(resultRepository.save(result));
    }

    public List<ResultResponse> getStudentResults(Long studentId) {
        return resultRepository.findByStudentIdOrderByAttemptedAtDesc(studentId)
                .stream()
                .map(ResultResponse::from)
                .toList();
    }

    public List<ResultResponse> getAllResults() {
        return resultRepository.findAll()
                .stream()
                .map(ResultResponse::from)
                .toList();
    }

    public ResultResponse getResult(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        return ResultResponse.from(result);
    }
}