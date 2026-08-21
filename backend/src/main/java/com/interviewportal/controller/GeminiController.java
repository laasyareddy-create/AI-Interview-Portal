package com.interviewportal.controller;

import com.interviewportal.dto.ai.AiEvaluationRequest;
import com.interviewportal.dto.ai.AiEvaluationResponse;
import com.interviewportal.service.ai.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gemini")
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;

    @PostMapping("/evaluate")
    public AiEvaluationResponse evaluate(
            @RequestBody AiEvaluationRequest request
    ) throws Exception {

        return geminiService.evaluateAnswer(request);
    }

    @GetMapping("/test")
    public String testGemini() {

        return geminiService.generateContent(
                "Say hello in one sentence."
        );
    }
}