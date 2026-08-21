package com.interviewportal.controller;

import com.interviewportal.dto.response.PerformanceReportResponse;
import com.interviewportal.service.PerformanceReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/performance-reports")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('trainer','admin')")
public class PerformanceReportController {

    private final PerformanceReportService performanceReportService;

    /**
     * GET /api/performance-reports
     * Returns per-student performance summaries (trainer + admin only).
     * Used by PerformanceReports.jsx
     */
    @GetMapping
    public ResponseEntity<List<PerformanceReportResponse>> getReports() {
        return ResponseEntity.ok(performanceReportService.getReports());
    }
}
