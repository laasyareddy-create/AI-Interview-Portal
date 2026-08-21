package com.interviewportal.service;

import com.interviewportal.dto.ai.AiEvaluationRequest;
import com.interviewportal.dto.ai.AiEvaluationResponse;
import com.interviewportal.entity.MockInterviewAnswer;
import com.interviewportal.entity.MockInterviewQuestion;
import com.interviewportal.service.ai.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIEvaluationService {

    private final GeminiService geminiService;

    public void evaluate(
            MockInterviewQuestion question,
            MockInterviewAnswer answer
    ) {

        String type = question.getType().toUpperCase();

        // ==========================
        // MCQ
        // ==========================
        if ("MCQ".equals(type)) {

            boolean correct =
                    answer.getStudentAnswer() != null &&
                            answer.getStudentAnswer()
                                    .equalsIgnoreCase(question.getCorrectAnswer());

            answer.setAiScore(correct ? 10 : 0);

            answer.setCorrectness(
                    correct ? "Correct" : "Incorrect"
            );

            answer.setFeedback(
                    correct
                            ? "Correct answer."
                            : "Incorrect answer."
            );

            answer.setStrengths(
                    correct
                            ? "Selected the correct option."
                            : ""
            );

            answer.setImprovements(
                    correct
                            ? ""
                            : "Review this concept and try again."
            );

            return;
        }

        // ==========================
        // DESCRIPTIVE + CODING
        // ==========================

        try {

            AiEvaluationRequest request =
                    AiEvaluationRequest.builder()
                            .questionType(question.getType())
                            .question(question.getQuestion())
                            .studentAnswer(answer.getStudentAnswer())
                            .sampleInput(question.getSampleInput())
                            .sampleOutput(question.getSampleOutput())
                            .build();

            AiEvaluationResponse response =
                    geminiService.evaluateAnswer(request);

            int score = (int) Math.round(response.getScore());

// Clamp score to 0–10
            score = Math.max(0, Math.min(10, score));

            answer.setAiScore(score);

            String correctness = response.getCorrectness().toLowerCase();

            if (correctness.contains("mostly")) {
                answer.setCorrectness("Mostly Correct");
            }
            else if (correctness.contains("partial")) {
                answer.setCorrectness("Partially Correct");
            }
            else if (correctness.contains("incorrect")) {
                answer.setCorrectness("Incorrect");
            }
            else {
                answer.setCorrectness("Correct");
            }

            answer.setFeedback(
                    response.getFeedback()
            );

            answer.setStrengths(
                    String.join(
                            "\n",
                            response.getStrengths()
                    )
            );

            answer.setImprovements(
                    String.join(
                            "\n",
                            response.getImprovements()
                    )
            );

        } catch (Exception e) {

            System.out.println("========== AI EVALUATION ERROR ==========");
            e.printStackTrace();
            System.out.println("=========================================");

            answer.setAiScore(0);

            answer.setCorrectness("Evaluation Failed");

            answer.setFeedback(
                    "Unable to evaluate using AI.\n\n"
                            + e.getMessage()
            );

            answer.setStrengths("");

            answer.setImprovements("");
        }

    }
}