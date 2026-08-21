package com.interviewportal.service;

import com.interviewportal.repository.MockInterviewRepository;
import com.interviewportal.dto.request.CreateMockInterviewRequest;
import com.interviewportal.dto.response.ApiResponse;
import com.interviewportal.dto.response.MockInterviewTemplateResponse;
import com.interviewportal.entity.MockInterviewTemplate;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.MockInterviewQuestionRepository;
import com.interviewportal.repository.MockInterviewTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MockInterviewTemplateService {

    private final MockInterviewTemplateRepository mockInterviewTemplateRepository;
    private final MockInterviewQuestionRepository questionRepository;
    private final MockInterviewRepository mockInterviewRepository;

    public List<MockInterviewTemplateResponse> getAll() {

        return mockInterviewTemplateRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MockInterviewTemplateResponse create(CreateMockInterviewRequest req) {

        MockInterviewTemplate interview = MockInterviewTemplate.builder()
                .name(req.getName())
                .category(req.getCategory())
                .duration(req.getDuration())
                .build();

        MockInterviewTemplate saved = mockInterviewTemplateRepository.save(interview);

        return toResponse(saved);
    }

    public MockInterviewTemplateResponse getById(Long id) {

        MockInterviewTemplate interview = mockInterviewTemplateRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mock Interview not found"));

        return toResponse(interview);
    }

    public MockInterviewTemplateResponse update(
            Long id,
            CreateMockInterviewRequest req
    ) {

        MockInterviewTemplate interview = mockInterviewTemplateRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Mock Interview not found"));

        interview.setName(req.getName());
        interview.setCategory(req.getCategory());
        interview.setDuration(req.getDuration());

        MockInterviewTemplate updated = mockInterviewTemplateRepository.save(interview);

        return toResponse(updated);
    }

    public ApiResponse delete(Long id) {

        MockInterviewTemplate interview =
                mockInterviewTemplateRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mock Interview not found"));

        mockInterviewRepository.deleteByTemplateId(id);

        questionRepository.deleteAll(
                questionRepository.findByMockInterviewIdOrderByIdAsc(id)
        );

        mockInterviewTemplateRepository.delete(interview);

        return ApiResponse.of(
                "Mock Interview deleted successfully"
        );

    }

    public List<MockInterviewTemplateResponse> getByCategory(
            String category
    ) {

        return mockInterviewTemplateRepository
                .findByCategoryIgnoreCaseOrderByCreatedAtDesc(category)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private MockInterviewTemplateResponse toResponse(MockInterviewTemplate interview) {

        return MockInterviewTemplateResponse.builder()
                .id(interview.getId())
                .name(interview.getName())
                .category(interview.getCategory())
                .duration(interview.getDuration())
                .createdAt(interview.getCreatedAt())
                .totalQuestions(
                        (int) questionRepository.countByMockInterviewId(interview.getId())
                )
                .build();
    }
}