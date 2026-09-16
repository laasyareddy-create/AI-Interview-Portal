package com.interviewportal.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewportal.dto.request.GenerateAssessmentAIRequest;
import com.interviewportal.dto.request.GenerateMockInterviewAIRequest;
import com.interviewportal.dto.response.AssessmentResponse;
import com.interviewportal.dto.response.MockInterviewQuestionResponse;
import com.interviewportal.dto.response.MockInterviewTemplateResponse;
import com.interviewportal.entity.Assessment;
import com.interviewportal.entity.MockInterviewQuestion;
import com.interviewportal.entity.MockInterviewTemplate;
import com.interviewportal.entity.Question;
import com.interviewportal.exception.BadRequestException;
import com.interviewportal.repository.AssessmentRepository;
import com.interviewportal.repository.MockInterviewQuestionRepository;
import com.interviewportal.repository.MockInterviewTemplateRepository;
import com.interviewportal.repository.QuestionRepository;
import com.interviewportal.service.ai.AzureOpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class AIQuestionGenerationService {

    private final AzureOpenAIService azureOpenAIService;
    private final ObjectMapper objectMapper;

    private final AssessmentRepository assessmentRepository;
    private final QuestionRepository questionRepository;

    private final MockInterviewTemplateRepository mockInterviewTemplateRepository;
    private final MockInterviewQuestionRepository mockInterviewQuestionRepository;


    // ============================================================
    // ASSESSMENT AI GENERATION
    // ============================================================

    @Transactional
    public AssessmentResponse generateAssessment(
            GenerateAssessmentAIRequest request
    ) {

        String prompt = buildAssessmentPrompt(request);

        String aiResponse =
                azureOpenAIService.generateContent(prompt);

        JsonNode questionsNode =
                extractQuestionsArray(aiResponse);

        if (!questionsNode.isArray()) {
            throw new BadRequestException(
                    "Azure returned an invalid assessment question format"
            );
        }

        if (questionsNode.size() != request.getNumberOfQuestions()) {
            throw new BadRequestException(
                    "Azure generated "
                            + questionsNode.size()
                            + " questions instead of "
                            + request.getNumberOfQuestions()
            );
        }

        Assessment assessment =
                Assessment.builder()
                        .name(request.getName())
                        .category(request.getCategory())
                        .difficulty(request.getDifficulty())
                        .duration(request.getDuration())
                        .build();

        Assessment savedAssessment =
                assessmentRepository.save(assessment);

        List<Question> generatedQuestions =
                new ArrayList<>();

        for (JsonNode node : questionsNode) {

            String questionText =
                    requiredText(node, "question");

            String optionA =
                    requiredText(node, "optionA");

            String optionB =
                    requiredText(node, "optionB");

            String optionC =
                    requiredText(node, "optionC");

            String optionD =
                    requiredText(node, "optionD");

            String correctAnswer =
                    normalizeCorrectAnswer(
                            requiredText(node, "correctAnswer")
                    );

            Question question =
                    Question.builder()
                            .question(questionText)
                            .optionA(optionA)
                            .optionB(optionB)
                            .optionC(optionC)
                            .optionD(optionD)
                            .correctAnswer(correctAnswer)
                            .marks(1)
                            .assessment(savedAssessment)
                            .build();

            generatedQuestions.add(question);
        }

        generatedQuestions =
                replaceDuplicateAssessmentQuestions(
                        generatedQuestions,
                        request,
                        savedAssessment
                );

        questionRepository.saveAll(generatedQuestions);


        return AssessmentResponse.from(savedAssessment);
    }


    // ============================================================
    // MOCK INTERVIEW AI GENERATION
    // ============================================================

    @Transactional
    public MockInterviewTemplateResponse generateMockInterview(
            GenerateMockInterviewAIRequest request
    ) {

        validateMockInterviewDistribution(request);

        String prompt =
                buildMockInterviewPrompt(request);

        String aiResponse =
                azureOpenAIService.generateContent(prompt);

        JsonNode questionsNode =
                extractQuestionsArray(aiResponse);

        if (!questionsNode.isArray()) {
            throw new BadRequestException(
                    "Azure returned an invalid mock interview question format"
            );
        }

        if (questionsNode.size() != request.getNumberOfQuestions()) {
            throw new BadRequestException(
                    "Azure generated "
                            + questionsNode.size()
                            + " questions instead of "
                            + request.getNumberOfQuestions()
            );
        }

        MockInterviewTemplate interview =
                MockInterviewTemplate.builder()
                        .name(request.getName())
                        .category(request.getCategory())
                        .duration(
                                request.getDuration() != null
                                        ? request.getDuration()
                                        : 30
                        )
                        .build();

        MockInterviewTemplate savedInterview =
                mockInterviewTemplateRepository.save(interview);

        List<MockInterviewQuestion> generatedQuestions =
                new ArrayList<>();

        for (JsonNode node : questionsNode) {

            String type =
                    normalizeQuestionType(
                            requiredText(node, "type")
                    );

            String questionText =
                    requiredText(node, "question");

            MockInterviewQuestion.MockInterviewQuestionBuilder builder =
                    MockInterviewQuestion.builder()
                            .mockInterview(savedInterview)
                            .type(type)
                            .question(questionText);

            if ("MCQ".equals(type)) {

                builder
                        .optionA(requiredText(node, "optionA"))
                        .optionB(requiredText(node, "optionB"))
                        .optionC(requiredText(node, "optionC"))
                        .optionD(requiredText(node, "optionD"))
                        .correctAnswer(
                                normalizeCorrectAnswer(
                                        requiredText(
                                                node,
                                                "correctAnswer"
                                        )
                                )
                        );
            }

            else if ("CODING".equals(type)) {

                builder
                        .sampleInput(
                                optionalText(node, "sampleInput")
                        )
                        .sampleOutput(
                                optionalText(node, "sampleOutput")
                        );
            }

            else if ("DESCRIPTIVE".equals(type)) {

                // Descriptive questions do not require
                // options, correct answers or sample input/output.
            }

            else {

                throw new BadRequestException(
                        "Azure returned unsupported question type: "
                                + type
                );
            }

            generatedQuestions.add(
                    builder.build()
            );
        }

        validateGeneratedMockDistribution(
                generatedQuestions,
                request.getQuestionCounts()
        );

        generatedQuestions =
                replaceDuplicateMockInterviewQuestions(
                        generatedQuestions,
                        request,
                        savedInterview
                );

        mockInterviewQuestionRepository.saveAll(
                generatedQuestions
        );

        return MockInterviewTemplateResponse.builder()
                .id(savedInterview.getId())
                .name(savedInterview.getName())
                .category(savedInterview.getCategory())
                .duration(savedInterview.getDuration())
                .createdAt(savedInterview.getCreatedAt())
                .totalQuestions(generatedQuestions.size())
                .build();
    }


    // ============================================================
    // ASSESSMENT PROMPT
    // ============================================================

    private String buildAssessmentPrompt(
            GenerateAssessmentAIRequest request
    ) {

        return """
                You are an expert technical assessment question generator.

                Generate a professional Multiple Choice Question (MCQ)
                assessment for an online interview preparation portal.

                Assessment details:

                Category: %s
                Difficulty: %s
                Number of questions: %d

                IMPORTANT RULES:

                1. Generate EXACTLY %d questions.
                2. Every question MUST be an MCQ.
                3. Every question MUST have exactly four options.
                4. Options must be labeled logically as A, B, C and D
                   through the JSON fields optionA, optionB, optionC and optionD.
                5. There MUST be exactly one correct answer.
                6. correctAnswer MUST contain ONLY one of:
                   A, B, C or D.
                7. Questions must be relevant to the selected category.
                8. Questions must match the selected difficulty exactly.
                
                   Difficulty definitions:
                
                   EASY:
                   - Test fundamental concepts and basic understanding.
                   - Questions should be straightforward and require minimal reasoning.
                   - Avoid advanced concepts, complex edge cases, and multi-step reasoning.
                
                   MEDIUM:
                   - Test understanding and practical application of concepts.
                   - Questions should require some reasoning or application of knowledge.
                   - Include realistic interview or placement-style scenarios.
                   - Avoid highly advanced or expert-level concepts.
                
                   HARD:
                   - Test advanced concepts, deeper understanding, and strong problem-solving ability.
                   - Questions may require multi-step reasoning and analysis.
                   - Include challenging interview-level scenarios and edge cases.
                   - Avoid questions that can be answered through simple recall alone.
                
                   The difficulty level applies to EVERY question.
                   Do not mix difficulty levels within the same assessment.
                9. Do not create duplicate or nearly duplicate questions.
                10. Avoid ambiguous questions.
                11. Avoid questions with multiple possible correct answers.
                12. Assessment questions are intended for students preparing
                    for technical interviews and placement tests.
                13. Do not include explanations.
                14. Do not include markdown.
                15. Return ONLY valid JSON.
                16. Do not wrap the JSON in ```json or ```.

                Return exactly this JSON structure:

                {
                  "questions": [
                    {
                      "question": "Question text",
                      "optionA": "Option A",
                      "optionB": "Option B",
                      "optionC": "Option C",
                      "optionD": "Option D",
                      "correctAnswer": "A"
                    }
                  ]
                }

                Generate exactly %d questions.
                """.formatted(
                request.getCategory(),
                request.getDifficulty(),
                request.getNumberOfQuestions(),
                request.getNumberOfQuestions(),
                request.getNumberOfQuestions()
        );
    }


    // ============================================================
    // MOCK INTERVIEW PROMPT
    // ============================================================

    private String buildMockInterviewPrompt(
            GenerateMockInterviewAIRequest request
    ) {

        String distribution =
                request.getQuestionCounts()
                        .entrySet()
                        .stream()
                        .map(entry ->
                                entry.getKey()
                                        + ": "
                                        + entry.getValue()
                        )
                        .reduce(
                                "",
                                (a, b) ->
                                        a.isEmpty()
                                                ? b
                                                : a + "\n" + b
                        );

        return """
                You are an expert technical interviewer creating a
                professional mock interview for an interview preparation portal.

                Interview details:

                Category: %s
                Total questions: %d

                REQUIRED QUESTION DISTRIBUTION:

                %s

                IMPORTANT RULES:

                1. Generate EXACTLY %d questions.
                2. Follow the requested question distribution EXACTLY.
                3. Do NOT change the number of questions for any type.
                4. Do NOT add extra questions.
                5. Do NOT omit any requested question type.
                6. Questions must be relevant to the selected category.
                8. Do not create duplicate or nearly duplicate questions.
                9. Questions should resemble realistic interview questions.

                MCQ RULES:

                - MCQ questions must contain exactly four options.
                - Use optionA, optionB, optionC and optionD.
                - There must be exactly one correct answer.
                - correctAnswer must contain only A, B, C or D.

                CODING RULES:
                
                - Coding questions must be realistic programming interview problems.
                - Include sampleInput where appropriate.
                - Include sampleOutput where appropriate.
                - Sample input and sample output must be clear and easy to understand.
                - Use multiline formatting when appropriate.
                - If the input contains JSON, arrays, or objects, format them with proper indentation instead of putting everything on one line.
                - Do not unnecessarily use JavaScript object-literal syntax.
                - Sample output must clearly correspond to the sample input.
                - Do not provide the solution.
                - Do not provide the expected answer as explanatory text.

                DESCRIPTIVE RULES:

                - Descriptive questions should be interview-style questions.
                - Do not include options.
                - Do not include a correctAnswer.
                - Do not include sample input/output unless genuinely required.

                OUTPUT RULES:

                - Return ONLY valid JSON.
                - Do not return markdown.
                - Do not wrap the response in ```json or ```.
                - The top-level JSON object MUST contain a questions array.

                Return exactly this structure:

                {
                  "questions": [
                    {
                      "type": "MCQ",
                      "question": "Question text",
                      "optionA": "Option A",
                      "optionB": "Option B",
                      "optionC": "Option C",
                      "optionD": "Option D",
                      "correctAnswer": "A",
                      "sampleInput": null,
                      "sampleOutput": null
                    },
                    {
                      "type": "CODING",
                      "question": "Coding problem",
                      "optionA": null,
                      "optionB": null,
                      "optionC": null,
                      "optionD": null,
                      "correctAnswer": null,
                      "sampleInput": "Example input",
                      "sampleOutput": "Example output"
                    },
                    {
                      "type": "DESCRIPTIVE",
                      "question": "Interview question",
                      "optionA": null,
                      "optionB": null,
                      "optionC": null,
                      "optionD": null,
                      "correctAnswer": null,
                      "sampleInput": null,
                      "sampleOutput": null
                    }
                  ]
                }

                Generate exactly %d questions.
                """.formatted(
                request.getCategory(),
                request.getNumberOfQuestions(),
                distribution,
                request.getNumberOfQuestions(),
                request.getNumberOfQuestions()
        );
    }


    // ============================================================
    // VALIDATION
    // ============================================================

    private void validateMockInterviewDistribution(
            GenerateMockInterviewAIRequest request
    ) {

        int total = 0;

        for (String type : request.getQuestionTypes()) {

            if (!isSupportedQuestionType(type)) {
                throw new BadRequestException(
                        "Unsupported question type: " + type
                );
            }

            Integer count =
                    request.getQuestionCounts()
                            .get(type);

            if (count == null || count < 1) {
                throw new BadRequestException(
                        "Question count must be at least 1 for "
                                + type
                );
            }

            total += count;
        }

        if (total != request.getNumberOfQuestions()) {
            throw new BadRequestException(
                    "Question distribution total ("
                            + total
                            + ") must equal number of questions ("
                            + request.getNumberOfQuestions()
                            + ")"
            );
        }

        // Communication and HR are descriptive-only.
        if (isCommunicationOrHr(request.getCategory())) {

            if (request.getQuestionTypes().size() != 1
                    || !"DESCRIPTIVE".equalsIgnoreCase(
                    request.getQuestionTypes().get(0)
            )) {

                throw new BadRequestException(
                        "Communication and HR Interview must use only Descriptive questions"
                );
            }
        }
    }


    private void validateGeneratedMockDistribution(
            List<MockInterviewQuestion> questions,
            Map<String, Integer> expectedCounts
    ) {

        Map<String, Long> actualCounts =
                questions.stream()
                        .collect(
                                java.util.stream.Collectors.groupingBy(
                                        MockInterviewQuestion::getType,
                                        java.util.stream.Collectors.counting()
                                )
                        );

        for (Map.Entry<String, Integer> entry :
                expectedCounts.entrySet()) {

            long actual =
                    actualCounts.getOrDefault(
                            normalizeQuestionType(entry.getKey()),
                            0L
                    );

            if (actual != entry.getValue()) {

                throw new BadRequestException(
                        "Azure returned an incorrect distribution for "
                                + entry.getKey()
                                + ". Expected "
                                + entry.getValue()
                                + " but received "
                                + actual
                );
            }
        }
    }


    private boolean isSupportedQuestionType(
            String type
    ) {

        return "MCQ".equalsIgnoreCase(type)
                || "CODING".equalsIgnoreCase(type)
                || "DESCRIPTIVE".equalsIgnoreCase(type);
    }


    private boolean isCommunicationOrHr(
            String category
    ) {

        return "Communication Skills".equalsIgnoreCase(category)
                || "HR Interview".equalsIgnoreCase(category);
    }


    // ============================================================
    // JSON HELPERS
    // ============================================================

    private JsonNode extractQuestionsArray(
            String response
    ) {

        try {

            String cleaned =
                    response
                            .replace("```json", "")
                            .replace("```", "")
                            .trim();

            JsonNode root =
                    objectMapper.readTree(cleaned);

            if (root.isArray()) {
                return root;
            }

            JsonNode questions =
                    root.get("questions");

            if (questions != null) {
                return questions;
            }

            throw new BadRequestException(
                    "Azure response does not contain a questions array"
            );

        } catch (BadRequestException e) {

            throw e;

        } catch (Exception e) {

            throw new BadRequestException(
                    "Unable to parse Azure AI response: "
                            + e.getMessage()
            );
        }
    }


    private String requiredText(
            JsonNode node,
            String field
    ) {

        JsonNode value = node.get(field);

        if (value == null
                || value.isNull()
                || value.asText().isBlank()) {

            throw new BadRequestException(
                    "Azure response is missing required field: "
                            + field
            );
        }

        return value.asText().trim();
    }


    private String optionalText(
            JsonNode node,
            String field
    ) {

        JsonNode value = node.get(field);

        if (value == null || value.isNull()) {
            return null;
        }

        String text = value.asText().trim();

        return text.isEmpty()
                ? null
                : text;
    }


    private String normalizeCorrectAnswer(
            String answer
    ) {

        String normalized =
                answer.trim()
                        .toUpperCase(Locale.ROOT);

        if (normalized.startsWith("OPTION")) {
            normalized =
                    normalized.substring(6);
        }

        if (!List.of("A", "B", "C", "D")
                .contains(normalized)) {

            throw new BadRequestException(
                    "Invalid correct answer returned by Azure: "
                            + answer
            );
        }

        return normalized;
    }


    private String normalizeQuestionType(
            String type
    ) {

        return type.trim()
                .toUpperCase(Locale.ROOT);
    }

    private List<Question> replaceDuplicateAssessmentQuestions(
            List<Question> generatedQuestions,
            GenerateAssessmentAIRequest request,
            Assessment savedAssessment
    ) {

        Set<String> usedQuestionTexts = new HashSet<>();

        List<Question> existingQuestions =
                questionRepository.findAll();

        for (Question existingQuestion : existingQuestions) {

            if (existingQuestion.getAssessment() == null
                    || existingQuestion.getAssessment().getCategory() == null) {
                continue;
            }

            if (!existingQuestion.getAssessment()
                    .getCategory()
                    .equalsIgnoreCase(request.getCategory())) {
                continue;
            }

            usedQuestionTexts.add(
                    normalizeQuestionText(
                            existingQuestion.getQuestion()
                    )
            );
        }

        List<Question> uniqueQuestions =
                new ArrayList<>();

        for (Question question : generatedQuestions) {

            String normalized =
                    normalizeQuestionText(
                            question.getQuestion()
                    );

            if (!usedQuestionTexts.contains(normalized)) {

                usedQuestionTexts.add(normalized);
                uniqueQuestions.add(question);

            } else {

                Question replacement =
                        generateReplacementAssessmentQuestion(
                                request,
                                usedQuestionTexts,
                                savedAssessment
                        );

                uniqueQuestions.add(replacement);

                usedQuestionTexts.add(
                        normalizeQuestionText(
                                replacement.getQuestion()
                        )
                );
            }
        }

        return uniqueQuestions;
    }

    private Question generateReplacementAssessmentQuestion(
            GenerateAssessmentAIRequest request,
            Set<String> usedQuestionTexts,
            Assessment savedAssessment
    ) {

        final int maxAttempts = 3;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {

            String prompt = """
                You are an expert technical assessment question generator.

                Generate ONE new Multiple Choice Question (MCQ).

                Category: %s
                Difficulty: %s

                IMPORTANT:

                1. Generate exactly ONE question.
                2. The question must be relevant to the selected category.
                3. The question MUST match the selected difficulty exactly.
                4. The question must be different from all previously used questions.
                5. Do not create a duplicate or nearly duplicate question.
                6. Use exactly four options.
                7. There must be exactly one correct answer.
                8. correctAnswer must contain only A, B, C or D.
                9. Do not include explanations.
                10. Return ONLY valid JSON.
                11. Do not use markdown.

                Return exactly this structure:

                {
                  "question": "Question text",
                  "optionA": "Option A",
                  "optionB": "Option B",
                  "optionC": "Option C",
                  "optionD": "Option D",
                  "correctAnswer": "A"
                }
                """.formatted(
                    request.getCategory(),
                    request.getDifficulty()
            );

            String aiResponse =
                    azureOpenAIService.generateContent(prompt);

            try {

                JsonNode root =
                        objectMapper.readTree(
                                aiResponse
                                        .replace("```json", "")
                                        .replace("```", "")
                                        .trim()
                        );

                String questionText =
                        requiredText(root, "question");

                String normalized =
                        normalizeQuestionText(questionText);

                if (usedQuestionTexts.contains(normalized)) {
                    continue;
                }

                String optionA =
                        requiredText(root, "optionA");

                String optionB =
                        requiredText(root, "optionB");

                String optionC =
                        requiredText(root, "optionC");

                String optionD =
                        requiredText(root, "optionD");

                String correctAnswer =
                        normalizeCorrectAnswer(
                                requiredText(root, "correctAnswer")
                        );

                return Question.builder()
                        .question(questionText)
                        .optionA(optionA)
                        .optionB(optionB)
                        .optionC(optionC)
                        .optionD(optionD)
                        .correctAnswer(correctAnswer)
                        .marks(1)
                        .assessment(savedAssessment)
                        .build();

            } catch (Exception e) {

                if (attempt == maxAttempts) {
                    throw new BadRequestException(
                            "Unable to generate a unique replacement assessment question"
                    );
                }
            }
        }

        throw new BadRequestException(
                "Unable to generate a unique replacement assessment question"
        );
    }

    private List<MockInterviewQuestion> replaceDuplicateMockInterviewQuestions(
            List<MockInterviewQuestion> generatedQuestions,
            GenerateMockInterviewAIRequest request,
            MockInterviewTemplate savedInterview
    ) {

        Set<String> usedQuestionTexts = new HashSet<>();

        List<MockInterviewQuestion> existingQuestions =
                mockInterviewQuestionRepository.findAll();

        for (MockInterviewQuestion existingQuestion : existingQuestions) {

            if (existingQuestion.getMockInterview() == null
                    || existingQuestion.getMockInterview().getCategory() == null) {
                continue;
            }

            if (!existingQuestion.getMockInterview()
                    .getCategory()
                    .equalsIgnoreCase(request.getCategory())) {
                continue;
            }

            usedQuestionTexts.add(
                    normalizeQuestionText(
                            existingQuestion.getQuestion()
                    )
            );
        }

        List<MockInterviewQuestion> uniqueQuestions =
                new ArrayList<>();

        for (MockInterviewQuestion question : generatedQuestions) {

            String normalized =
                    normalizeQuestionText(
                            question.getQuestion()
                    );

            if (!usedQuestionTexts.contains(normalized)) {

                usedQuestionTexts.add(normalized);
                uniqueQuestions.add(question);

            } else {

                MockInterviewQuestion replacement =
                        generateReplacementMockInterviewQuestion(
                                request,
                                question.getType(),
                                usedQuestionTexts,
                                savedInterview
                        );

                uniqueQuestions.add(replacement);

                usedQuestionTexts.add(
                        normalizeQuestionText(
                                replacement.getQuestion()
                        )
                );
            }
        }

        return uniqueQuestions;
    }

    private MockInterviewQuestion generateReplacementMockInterviewQuestion(
            GenerateMockInterviewAIRequest request,
            String questionType,
            Set<String> usedQuestionTexts,
            MockInterviewTemplate savedInterview
    ) {

        final int maxAttempts = 3;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {

            String prompt = buildMockReplacementPrompt(
                    request,
                    questionType
            );

            String aiResponse =
                    azureOpenAIService.generateContent(prompt);

            try {

                JsonNode root =
                        objectMapper.readTree(
                                aiResponse
                                        .replace("```json", "")
                                        .replace("```", "")
                                        .trim()
                        );

                String questionText =
                        requiredText(root, "question");

                String normalized =
                        normalizeQuestionText(questionText);

                if (usedQuestionTexts.contains(normalized)) {
                    continue;
                }

                MockInterviewQuestion.MockInterviewQuestionBuilder builder =
                        MockInterviewQuestion.builder()
                                .mockInterview(savedInterview)
                                .type(questionType)
                                .question(questionText);

                if ("MCQ".equals(questionType)) {

                    builder
                            .optionA(requiredText(root, "optionA"))
                            .optionB(requiredText(root, "optionB"))
                            .optionC(requiredText(root, "optionC"))
                            .optionD(requiredText(root, "optionD"))
                            .correctAnswer(
                                    normalizeCorrectAnswer(
                                            requiredText(
                                                    root,
                                                    "correctAnswer"
                                            )
                                    )
                            );

                } else if ("CODING".equals(questionType)) {

                    builder
                            .sampleInput(
                                    optionalText(root, "sampleInput")
                            )
                            .sampleOutput(
                                    optionalText(root, "sampleOutput")
                            );

                } else if ("DESCRIPTIVE".equals(questionType)) {

                    // No additional fields required.

                } else {

                    throw new BadRequestException(
                            "Unsupported replacement question type: "
                                    + questionType
                    );
                }

                return builder.build();

            } catch (BadRequestException e) {

                if (attempt == maxAttempts) {
                    throw e;
                }

            } catch (Exception e) {

                if (attempt == maxAttempts) {
                    throw new BadRequestException(
                            "Unable to generate a unique replacement mock interview question"
                    );
                }
            }
        }

        throw new BadRequestException(
                "Unable to generate a unique replacement mock interview question"
        );
    }


    private String buildMockReplacementPrompt(
            GenerateMockInterviewAIRequest request,
            String questionType
    ) {

        if ("MCQ".equals(questionType)) {

            return """
                You are an expert technical interviewer.

                Generate ONE new Multiple Choice Question (MCQ).

                Category: %s

                IMPORTANT:
                1. Generate exactly ONE question.
                2. The question must be relevant to the selected category.
                3. The question must be different from previously used questions.
                4. Do not create a duplicate or nearly duplicate question.
                5. Use exactly four options.
                6. There must be exactly one correct answer.
                7. correctAnswer must contain only A, B, C or D.
                8. Return ONLY valid JSON.
                9. Do not use markdown.

                Return exactly:

                {
                  "type": "MCQ",
                  "question": "Question text",
                  "optionA": "Option A",
                  "optionB": "Option B",
                  "optionC": "Option C",
                  "optionD": "Option D",
                  "correctAnswer": "A",
                  "sampleInput": null,
                  "sampleOutput": null
                }
                """.formatted(request.getCategory());
        }

        if ("CODING".equals(questionType)) {

            return """
                You are an expert technical interviewer.

                Generate ONE new coding interview question.

                Category: %s

                IMPORTANT:
                1. Generate exactly ONE coding question.
                2. The question must be relevant to the selected category.
                3. The question must be different from previously used questions.
                4. Do not create a duplicate or nearly duplicate question.
                5. Include sampleInput where appropriate.
                6. Include sampleOutput where appropriate.
                7. Sample input and sample output must be clear and easy to understand.
                8. Use multiline formatting when appropriate.
                9. If the input contains JSON, arrays, or objects, format them with proper indentation instead of putting everything on one line.
                10. Do not unnecessarily use JavaScript object-literal syntax.
                11. Sample output must clearly correspond to the sample input.
                12. Do not provide the solution.
                13. Return ONLY valid JSON.
                14. Do not use markdown.

                Return exactly:

                {
                  "type": "CODING",
                  "question": "Coding problem",
                  "optionA": null,
                  "optionB": null,
                  "optionC": null,
                  "optionD": null,
                  "correctAnswer": null,
                  "sampleInput": "Example input",
                  "sampleOutput": "Example output"
                }
                """.formatted(request.getCategory());
        }

        return """
            You are an expert technical interviewer.

            Generate ONE new descriptive interview question.

            Category: %s

            IMPORTANT:
            1. Generate exactly ONE descriptive question.
            2. The question must be relevant to the selected category.
            3. The question must be different from previously used questions.
            4. Do not create a duplicate or nearly duplicate question.
            5. Make it realistic for an interview.
            6. Do not include options.
            7. Do not include a correctAnswer.
            8. Do not include sampleInput or sampleOutput.
            9. Return ONLY valid JSON.
            10. Do not use markdown.

            Return exactly:

                {
                   "type": "DESCRIPTIVE",
                   "question": "Interview question"
                 }
            """.formatted(request.getCategory());
    }


    private String normalizeQuestionText(String text) {

        return text
                .trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", " ");
    }
}