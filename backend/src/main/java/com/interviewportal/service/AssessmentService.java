package com.interviewportal.service;

import com.interviewportal.dto.request.CreateAssessmentRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.AssessmentResponse;
import com.interviewportal.entity.Assessment;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;

    public List<AssessmentResponse> getAll() {
        return assessmentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AssessmentResponse::from)
                .toList();
    }

    // ⭐ NEW METHOD
    public List<AssessmentResponse> filterAssessments(
            String category,
            String difficulty
    ) {

        return assessmentRepository
                .findByCategoryAndDifficultyOrderByCreatedAtDesc(category, difficulty)
                .stream()
                .map(AssessmentResponse::from)
                .toList();
    }

    public AssessmentResponse create(CreateAssessmentRequest req) {

        Assessment assessment = Assessment.builder()
                .name(req.getName())
                .category(req.getCategory())
                .difficulty(req.getDifficulty())
                .duration(req.getDuration())
                .build();

        return AssessmentResponse.from(assessmentRepository.save(assessment));
    }

    public ApiResponse delete(Long id) {
        if (!assessmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Assessment not found");
        }

        assessmentRepository.deleteById(id);

        return ApiResponse.of("Assessment deleted successfully");
    }

    public AssessmentResponse update(Long id, CreateAssessmentRequest req) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found"));

        assessment.setName(req.getName());
        assessment.setCategory(req.getCategory());
        assessment.setDifficulty(req.getDifficulty());
        assessment.setDuration(req.getDuration());

        return AssessmentResponse.from(
                assessmentRepository.save(assessment)
        );
    }

    public AssessmentResponse getById(Long id) {

        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found"));

        return AssessmentResponse.from(assessment);
    }
}