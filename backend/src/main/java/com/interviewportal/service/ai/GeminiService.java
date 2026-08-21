package com.interviewportal.service.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewportal.dto.ai.AiEvaluationRequest;
import com.interviewportal.dto.ai.AiEvaluationResponse;
import com.interviewportal.dto.ai.AnalyticsAIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String MODEL = "gemini-flash-latest";

    public String generateContent(String prompt) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/"
                        + MODEL
                        + ":generateContent?key="
                        + apiKey;

        Map<String, Object> body = Map.of(
                "contents",
                List.of(
                        Map.of(
                                "parts",
                                List.of(
                                        Map.of(
                                                "text",
                                                prompt
                                        )
                                )
                        )
                )
        );

        Map response =
                restClient.post()
                        .uri(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(body)
                        .retrieve()
                        .body(Map.class);

        if (response == null) {
            return "No response from Gemini.";
        }

        try {

            List candidates = (List) response.get("candidates");

            Map candidate = (Map) candidates.get(0);

            Map content = (Map) candidate.get("content");

            List parts = (List) content.get("parts");

            Map part = (Map) parts.get(0);

            return part.get("text").toString();

        } catch (Exception e) {

            return "Unable to parse Gemini response.";
        }
    }
    public AiEvaluationResponse evaluateAnswer(AiEvaluationRequest request) throws Exception {

        String prompt = """
            You are a Senior Technical Interviewer.

            Evaluate the student's answer.

            Question Type:
            %s

            Question:
            %s

            Student Answer:
            %s

            Sample Input:
            %s

            Sample Output:
            %s

                Rules:
                
                1. Evaluate like a real technical interviewer.
                2. Be strict but fair.
                3. Score MUST be an INTEGER from 0 to 10 ONLY.
                4. Never return percentages.
                5. Never return decimal values.
                6. Never return values greater than 10.
                7. Return ONLY valid JSON.
                8. Do not wrap the JSON inside ```json markdown.
                
                Return exactly this format:
                
                {
                  "score": 0,
                  "correctness": "",
                  "feedback": "",
                  "strengths": [],
                  "improvements": []
                }
            """.formatted(
                request.getQuestionType(),
                request.getQuestion(),
                request.getStudentAnswer(),
                request.getSampleInput(),
                request.getSampleOutput()
        );

        String json = generateContent(prompt);

        System.out.println("========== GEMINI RESPONSE ==========");
        System.out.println(json);
        System.out.println("=====================================");

// Remove Markdown code fences if Gemini returns them
        json = json.replace("```json", "")
                .replace("```", "")
                .trim();

        return objectMapper.readValue(json, AiEvaluationResponse.class);
    }
    public AnalyticsAIResponse generateAnalyticsSummary(String interviewHistory) throws Exception {

        String prompt = """
            You are an expert Senior Technical Interview Coach.

            Below is the student's complete interview history.

            %s

            Analyze the student's overall interview performance.

            Return ONLY valid JSON in exactly this format:

            {
              "overallFeedback": "",
              "strengths": [
                "",
                "",
                ""
              ],
              "improvements": [
                "",
                "",
                ""
              ]
            }

            Rules:

            1. Analyze ALL interview history.
            2. Don't focus on only one question.
            3. Find recurring strengths.
            4. Find recurring weaknesses.
            5. Mention concepts across different categories.
            6. Give only 3 strengths.
            7. Give only 3 improvements.
            8. Overall feedback should be 4-6 sentences.
            9. Return ONLY JSON.
            """
                .formatted(interviewHistory);

        String json = generateContent(prompt);

        json = json.replace("```json", "")
                .replace("```", "")
                .trim();

        return objectMapper.readValue(
                json,
                AnalyticsAIResponse.class
        );
    }
}