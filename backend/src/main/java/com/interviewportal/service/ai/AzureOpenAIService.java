package com.interviewportal.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewportal.dto.ai.AiEvaluationRequest;
import com.interviewportal.dto.ai.AiEvaluationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class AzureOpenAIService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${azure.openai.endpoint}")
    private String endpoint;

    @Value("${azure.openai.api-key}")
    private String apiKey;

    @Value("${azure.openai.deployment}")
    private String deployment;

    public AzureOpenAIService(
            RestClient.Builder restClientBuilder,
            ObjectMapper objectMapper
    ) {
        this.restClient = restClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    // ============================================================
    // GENERATE CONTENT
    // ============================================================

    public String generateContent(String prompt) {

        Map<String, Object> requestBody = Map.of(
                "model", deployment,
                "messages", new Object[]{
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                },
                "temperature", 0.2
        );

        JsonNode response = restClient.post()
                .uri(endpoint + "/chat/completions")
                .header("api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        if (response == null) {
            throw new RuntimeException(
                    "Azure OpenAI returned an empty response"
            );
        }

        JsonNode content = response
                .path("choices")
                .path(0)
                .path("message")
                .path("content");

        if (content.isMissingNode() || content.isNull()) {
            throw new RuntimeException(
                    "Azure OpenAI response did not contain message content"
            );
        }

        return content.asText();
    }

    // ============================================================
    // AI ANSWER EVALUATION
    // ============================================================

    public AiEvaluationResponse evaluateAnswer(
            AiEvaluationRequest request
    ) throws Exception {

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

        System.out.println("========== AZURE OPENAI RESPONSE ==========");
        System.out.println(json);
        System.out.println("===========================================");

        // Remove Markdown code fences if Azure returns them
        json = json.replace("```json", "")
                .replace("```", "")
                .trim();

        return objectMapper.readValue(
                json,
                AiEvaluationResponse.class
        );
    }
}