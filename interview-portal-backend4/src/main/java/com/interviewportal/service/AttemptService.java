package com.interviewportal.service;

import com.interviewportal.dto.request.SubmitAttemptRequest;
import com.interviewportal.dto.response.AttemptResponse;
import com.interviewportal.entity.AssessmentAttempt;
import com.interviewportal.entity.User;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.AssessmentAttemptRepository;
import com.interviewportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AssessmentAttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public List<AttemptResponse> getMyAttempts(Long studentId) {
        return attemptRepository.findByStudentIdOrderByAttemptedAtDesc(studentId)
                .stream()
                .map(AttemptResponse::from)
                .toList();
    }

    public AttemptResponse submit(Long studentId, SubmitAttemptRequest req) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AssessmentAttempt attempt = AssessmentAttempt.builder()
                .student(student)
                .studentName(student.getName())
                .studentEmail(student.getEmail())
                .category(req.getCategory())
                .difficulty(req.getDifficulty())
                .score(req.getScore())
                .totalQuestions(req.getTotalQuestions())
                .correctAnswers(req.getCorrectAnswers())
                .wrongAnswers(req.getWrongAnswers())
                .percentage(req.getPercentage())
                .build();

        return AttemptResponse.from(attemptRepository.save(attempt));
    }

    public List<AttemptResponse> getAllAttempts() {
        return attemptRepository.findAllByOrderByAttemptedAtDesc()
                .stream()
                .map(AttemptResponse::from)
                .toList();
    }
}
