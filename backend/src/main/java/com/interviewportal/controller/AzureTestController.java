package com.interviewportal.controller;

import com.interviewportal.service.ai.AzureOpenAIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/azure-test")
public class AzureTestController {

    private final AzureOpenAIService azureOpenAIService;

    public AzureTestController(AzureOpenAIService azureOpenAIService) {
        this.azureOpenAIService = azureOpenAIService;
    }

    @GetMapping
    public String testAzure() {
        return azureOpenAIService.generateContent(
                "Reply with exactly: Azure connection successful"
        );
    }
}