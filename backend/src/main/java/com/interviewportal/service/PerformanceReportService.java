package com.interviewportal.service;

import com.interviewportal.dto.response.AttemptResponse;
import com.interviewportal.dto.response.PerformanceReportResponse;
import com.interviewportal.entity.AssessmentAttempt;
import com.interviewportal.entity.MockInterview;
import com.interviewportal.repository.AssessmentAttemptRepository;
import com.interviewportal.repository.MockInterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceReportService {

    private final AssessmentAttemptRepository attemptRepository;
    private final MockInterviewRepository mockInterviewRepository;

    public List<PerformanceReportResponse> getReports() {
        List<AssessmentAttempt> all = attemptRepository.findAllByOrderByAttemptedAtDesc();

        // Group by student email
        Map<String, List<AssessmentAttempt>> grouped = all.stream()
                .filter(a -> a.getStudentEmail() != null && a.getStudentName() != null)
                .collect(Collectors.groupingBy(AssessmentAttempt::getStudentEmail));

        List<PerformanceReportResponse> reports = new ArrayList<>();

        for (Map.Entry<String, List<AssessmentAttempt>> entry : grouped.entrySet()) {
            List<AssessmentAttempt> studentAttempts = entry.getValue();
            if (studentAttempts.isEmpty()) continue;

            String studentName  = studentAttempts.get(0).getStudentName();
            String studentEmail = entry.getKey();

            double[] scores = studentAttempts.stream()
                    .mapToDouble(AssessmentAttempt::getPercentage).toArray();

            double average = Arrays.stream(scores).average().orElse(0);
            double highest = Arrays.stream(scores).max().orElse(0);
            double lowest  = Arrays.stream(scores).min().orElse(0);

            // Best category (highest average)
            Map<String, DoubleSummaryStatistics> catStats = studentAttempts.stream()
                    .collect(Collectors.groupingBy(
                            AssessmentAttempt::getCategory,
                            Collectors.summarizingDouble(AssessmentAttempt::getPercentage)));
            String bestCategory = catStats.entrySet().stream()
                    .max(Comparator.comparingDouble(e -> e.getValue().getAverage()))
                    .map(Map.Entry::getKey).orElse("N/A");

            String performanceLevel = performanceLevel((int) Math.round(average));

            // Mock interview stats for this student
            List<MockInterview> mocks = mockInterviewRepository.findByStudentName(studentName);
            int mockCount = mocks.size();
            double avgMock = mocks.stream()
                    .mapToDouble(MockInterview::getPercentage).average().orElse(0);
            double bestMock = mocks.stream()
                    .mapToDouble(MockInterview::getPercentage).max().orElse(0);

            List<AttemptResponse> history = studentAttempts.stream()
                    .map(AttemptResponse::from).toList();

            reports.add(PerformanceReportResponse.builder()
                    .studentName(studentName)
                    .studentEmail(studentEmail)
                    .average(Math.round(average * 10) / 10.0)
                    .highest(highest)
                    .lowest(lowest)
                    .totalAttempts(studentAttempts.size())
                    .performanceLevel(performanceLevel)
                    .bestCategory(bestCategory)
                    .mockInterviewsTaken(mockCount)
                    .avgMockScore(Math.round(avgMock * 10) / 10.0)
                    .bestMockScore(bestMock)
                    .assessmentHistory(history)
                    .build());
        }

        return reports;
    }

    private String performanceLevel(int avg) {
        if (avg >= 90) return "Outstanding";
        if (avg >= 80) return "Excellent";
        if (avg >= 70) return "Good";
        if (avg >= 50) return "Average";
        return "Needs Improvement";
    }
}
