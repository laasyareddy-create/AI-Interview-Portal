package com.interviewportal.service;

import com.interviewportal.entity.AnalyticsSummary;
import com.interviewportal.repository.AnalyticsSummaryRepository;
import com.interviewportal.entity.AnalyticsSummary;
import com.interviewportal.dto.response.MockInterviewResponse;
import com.interviewportal.dto.response.AttemptResponse;
import com.interviewportal.dto.response.DashboardResponse;
import com.interviewportal.entity.AssessmentAttempt;
import com.interviewportal.entity.MockInterview;
import com.interviewportal.entity.User;
import com.interviewportal.exception.ResourceNotFoundException;
import com.interviewportal.repository.AssessmentAttemptRepository;
import com.interviewportal.repository.MockInterviewRepository;
import com.interviewportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final AssessmentAttemptRepository attemptRepository;
    private final MockInterviewRepository mockInterviewRepository;
    private final AnalyticsSummaryRepository analyticsSummaryRepository;

    public DashboardResponse getDashboard(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<AssessmentAttempt> attempts =
                attemptRepository.findByStudentIdOrderByAttemptedAtDesc(studentId);
        List<MockInterview> mocks =
                mockInterviewRepository.findByStudentIdOrderByCompletedAtDesc(studentId);

        int completedAssessments = attempts.size();

        double overallScore = attempts.isEmpty() ? 0 :
                Math.round(attempts.stream()
                        .mapToDouble(AssessmentAttempt::getPercentage)
                        .average().orElse(0) * 10) / 10.0;

        // Streak: count distinct days that have at least one activity
        Set<LocalDate> activeDays = new HashSet<>();

        attempts.forEach(a -> {
            if (a.getAttemptedAt() != null) {
                activeDays.add(a.getAttemptedAt().toLocalDate());
            }
        });

        mocks.forEach(m -> {
            if (m.getCompletedAt() != null) {
                activeDays.add(m.getCompletedAt().toLocalDate());
            }
        });

        int practiceStreakDays = 0;
        LocalDate streakDate = LocalDate.now();

        while (activeDays.contains(streakDate)) {
            practiceStreakDays++;
            streakDate = streakDate.minusDays(1);
        }

        LocalDate today = LocalDate.now();

        boolean assessmentToday = attempts.stream()
                .anyMatch(a -> a.getAttemptedAt() != null
                        && a.getAttemptedAt().toLocalDate().equals(today));

        boolean mockInterviewToday = mocks.stream()
                .anyMatch(m -> m.getCompletedAt() != null
                        && m.getCompletedAt().toLocalDate().equals(today));

        // 5 most recent attempts for the summary table
        List<AttemptResponse> recentAttempts = attempts.stream()
                .limit(5)
                .map(AttemptResponse::from)
                .toList();
        List<MockInterviewResponse> recentMockInterviews = mocks.stream()
                .limit(5)
                .map(MockInterviewResponse::from)
                .toList();



        return DashboardResponse.builder()
                .welcomeName(student.getName())
                .upcomingInterviews(3)          // static placeholder, extend with scheduling feature
                .completedAssessments(completedAssessments)
                .overallScore(overallScore)
                .practiceStreakDays(practiceStreakDays)
                .assessmentToday(assessmentToday)
                .mockInterviewToday(mockInterviewToday)
                .recentAttempts(recentAttempts)
                .recentMockInterviews(recentMockInterviews)
                .recommendedPracticeAreas(
                        analyticsSummaryRepository
                                .findByStudentId(studentId)
                                .map(AnalyticsSummary::getImprovements)
                                .orElse(List.of())
                )
                .build();
    }
}
