package com.interviewportal.service;

import com.interviewportal.entity.AnalyticsSummary;
import com.fasterxml.jackson.core.type.TypeReference;
import com.interviewportal.repository.AnalyticsSummaryRepository;
import com.interviewportal.dto.response.AdminAnalyticsResponse;
import com.interviewportal.dto.response.AnalyticsResponse;
import com.interviewportal.dto.ai.AnalyticsAIResponse;
import com.interviewportal.entity.AssessmentAttempt;
import com.interviewportal.entity.MockInterview;
import com.interviewportal.entity.MockInterviewAnswer;
import com.interviewportal.enums.Role;
import com.interviewportal.repository.AssessmentAttemptRepository;
import com.interviewportal.repository.MockInterviewAnswerRepository;
import com.interviewportal.repository.MockInterviewRepository;
import com.interviewportal.repository.UserRepository;
import com.interviewportal.service.ai.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AssessmentAttemptRepository attemptRepository;
    private final MockInterviewRepository mockInterviewRepository;
    private final MockInterviewAnswerRepository mockInterviewAnswerRepository;
    private final UserRepository userRepository;
    private final AnalyticsSummaryRepository analyticsSummaryRepository;
    private final GeminiService geminiService;

    public AnalyticsResponse getStudentAnalytics(Long studentId) {

        List<AssessmentAttempt> attempts =
                attemptRepository.findByStudentIdOrderByAttemptedAtDesc(studentId);

        List<MockInterview> mocks =
                mockInterviewRepository.findByStudentIdOrderByCompletedAtDesc(studentId);

        List<MockInterviewAnswer> answers =
                mockInterviewAnswerRepository.findByMockInterviewStudentId(studentId);

        int highestScore = attempts.stream()
                .mapToInt(a -> (int) a.getPercentage())
                .max()
                .orElse(0);

        int averageScore = attempts.isEmpty()
                ? 0
                : (int) Math.round(
                attempts.stream()
                        .mapToDouble(AssessmentAttempt::getPercentage)
                        .average()
                        .orElse(0)
        );

        List<AssessmentAttempt> chronological =
                new ArrayList<>(attempts);

        Collections.reverse(chronological);

        List<AnalyticsResponse.ScoreTrend> scoreTrend =
                new ArrayList<>();

        for (int i = 0; i < chronological.size(); i++) {

            scoreTrend.add(
                    AnalyticsResponse.ScoreTrend.builder()
                            .week("Attempt " + (i + 1))
                            .score(
                                    chronological.get(i).getPercentage()
                            )
                            .build()
            );

        }

        Map<String, List<Double>> categoryMap =
                new LinkedHashMap<>();

        for (AssessmentAttempt attempt : attempts) {

            categoryMap
                    .computeIfAbsent(
                            attempt.getCategory(),
                            k -> new ArrayList<>()
                    )
                    .add(
                            attempt.getPercentage()
                    );

        }

        List<AnalyticsResponse.SkillScore> skills =
                categoryMap.entrySet()
                        .stream()
                        .map(entry ->
                                AnalyticsResponse.SkillScore.builder()
                                        .category(entry.getKey())
                                        .score(
                                                Math.round(
                                                        entry.getValue()
                                                                .stream()
                                                                .mapToDouble(Double::doubleValue)
                                                                .average()
                                                                .orElse(0)
                                                )
                                        )
                                        .build()
                        )
                        .toList();
        Map<String, List<Double>> mockCategoryMap =
                new LinkedHashMap<>();

        for (MockInterview mock : mocks) {

            mockCategoryMap
                    .computeIfAbsent(
                            mock.getCategory(),
                            k -> new ArrayList<>()
                    )
                    .add(mock.getPercentage());

        }

        List<AnalyticsResponse.MockCategoryAnalytic> mockCategoryAnalytics =
                mockCategoryMap.entrySet()
                        .stream()
                        .map(entry ->
                                AnalyticsResponse.MockCategoryAnalytic.builder()
                                        .category(entry.getKey())
                                        .attempts(entry.getValue().size())
                                        .bestScore(
                                                entry.getValue()
                                                        .stream()
                                                        .mapToDouble(Double::doubleValue)
                                                        .max()
                                                        .orElse(0)
                                        )
                                        .avgScore(
                                                Math.round(
                                                        entry.getValue()
                                                                .stream()
                                                                .mapToDouble(Double::doubleValue)
                                                                .average()
                                                                .orElse(0)
                                                )
                                        )
                                        .build()
                        )
                        .toList();


        AnalyticsAIResponse aiResponse;
        Optional<AnalyticsSummary> summary =
                analyticsSummaryRepository.findByStudentId(studentId);

        try {

            StringBuilder interviewHistory = new StringBuilder();

            interviewHistory.append("ASSESSMENT PERFORMANCE\n");

            for (AssessmentAttempt attempt : attempts) {

                interviewHistory.append("Assessment Category: ")
                        .append(attempt.getCategory())
                        .append("\n");

                interviewHistory.append("Difficulty: ")
                        .append(attempt.getDifficulty())
                        .append("\n");

                interviewHistory.append("Score: ")
                        .append(attempt.getPercentage())
                        .append("%\n");

                interviewHistory.append("Correct Answers: ")
                        .append(attempt.getCorrectAnswers())
                        .append("\n");

                interviewHistory.append("Wrong Answers: ")
                        .append(attempt.getWrongAnswers())
                        .append("\n");

                interviewHistory.append("----------------------------------------\n");
            }

            interviewHistory.append("\nMOCK INTERVIEW PERFORMANCE\n");

            int interviewNo = 1;

            for (MockInterviewAnswer answer : answers) {

                interviewHistory.append("Interview ")
                        .append(interviewNo++)
                        .append("\n");

                interviewHistory.append("Category: ")
                        .append(answer.getMockInterview().getCategory())
                        .append("\n");

                interviewHistory.append("Question: ")
                        .append(answer.getQuestion().getQuestion())
                        .append("\n");

                interviewHistory.append("Score: ")
                        .append(answer.getAiScore())
                        .append("/10\n");

                interviewHistory.append("Feedback: ")
                        .append(answer.getFeedback())
                        .append("\n");

                interviewHistory.append("----------------------------------------\n");

            }

            System.out.println("========== ANALYTICS PROMPT ==========");
            System.out.println(interviewHistory);
            System.out.println("======================================");

            aiResponse =
                    geminiService.generateAnalyticsSummary(
                            interviewHistory.toString()
                    );

            System.out.println("========== ANALYTICS RESPONSE ==========");
            System.out.println(aiResponse);
            System.out.println("========================================");

            if (!answers.isEmpty()) {

                AnalyticsSummary analyticsSummary = summary.orElseGet(
                        () -> AnalyticsSummary.builder()
                                .student(answers.get(0).getMockInterview().getStudent())
                                .build()
                );

                analyticsSummary.setOverallFeedback(
                        aiResponse.getOverallFeedback()
                );

                analyticsSummary.setStrengths(
                        aiResponse.getStrengths()
                );

                analyticsSummary.setImprovements(
                        aiResponse.getImprovements()
                );

                analyticsSummary.setUpdatedAt(
                        java.time.LocalDateTime.now()
                );

                analyticsSummaryRepository.save(analyticsSummary);
            }

        } catch (Exception e) {

            e.printStackTrace();

            aiResponse = new AnalyticsAIResponse();

            aiResponse.setOverallFeedback(
                    "Unable to generate AI performance summary at the moment."
            );

            aiResponse.setStrengths(List.of());

            aiResponse.setImprovements(List.of());

        }
        return AnalyticsResponse.builder()
                .highestScore(highestScore)
                .averageScore(averageScore)
                .assessments(attempts.size())
                .mockInterviews(mocks.size())

                .scoreTrend(scoreTrend)
                .skills(skills)

                .mockCategoryAnalytics(mockCategoryAnalytics)

                .strengths(aiResponse.getStrengths())
                .improvements(aiResponse.getImprovements())
                .overallFeedback(aiResponse.getOverallFeedback())

                .build();
    }
    public AdminAnalyticsResponse getAdminAnalytics() {

        List<AssessmentAttempt> allAttempts =
                attemptRepository.findAllByOrderByAttemptedAtDesc();

        long totalUsers = userRepository.count();
        long students = userRepository.countByRole(Role.student);
        long trainers = userRepository.countByRole(Role.trainer);
        long admins = userRepository.countByRole(Role.admin);

        int total = allAttempts.size();

        double avg =
                total == 0
                        ? 0
                        : allAttempts.stream()
                        .mapToDouble(AssessmentAttempt::getPercentage)
                        .average()
                        .orElse(0);

        double highest =
                total == 0
                        ? 0
                        : allAttempts.stream()
                        .mapToDouble(AssessmentAttempt::getPercentage)
                        .max()
                        .orElse(0);

        double lowest =
                total == 0
                        ? 0
                        : allAttempts.stream()
                        .mapToDouble(AssessmentAttempt::getPercentage)
                        .min()
                        .orElse(0);

        double passRate =
                total == 0
                        ? 0
                        : (allAttempts.stream()
                        .filter(a -> a.getPercentage() >= 50)
                        .count() * 100.0) / total;

        Map<String, Long> categoryCount =
                allAttempts.stream()
                        .collect(
                                Collectors.groupingBy(
                                        AssessmentAttempt::getCategory,
                                        Collectors.counting()
                                )
                        );

        String mostAttempted = "N/A";

        if (!categoryCount.isEmpty()) {

            long maxAttempts = categoryCount.values()
                    .stream()
                    .max(Long::compareTo)
                    .orElse(0L);

            mostAttempted = categoryCount.entrySet()
                    .stream()
                    .filter(entry -> entry.getValue() == maxAttempts)
                    .map(Map.Entry::getKey)
                    .sorted()
                    .collect(Collectors.joining(", "));
        }

        return AdminAnalyticsResponse.builder()
                .totalUsers(totalUsers)
                .students(students)
                .trainers(trainers)
                .admins(admins)
                .totalAttempts(total)
                .averageScore(Math.round(avg * 10.0) / 10.0)
                .highestScore(highest)
                .lowestScore(lowest)
                .passRate(Math.round(passRate * 10.0) / 10.0)
                .mostAttempted(mostAttempted)
                .build();
    }

}