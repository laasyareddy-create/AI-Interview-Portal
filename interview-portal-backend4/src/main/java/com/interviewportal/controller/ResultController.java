package com.interviewportal.controller;

import com.interviewportal.dto.request.CreateResultRequest;
import com.interviewportal.dto.response.ResultResponse;
import com.interviewportal.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResultController {

    private final ResultService resultService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResultResponse saveResult(@RequestBody CreateResultRequest request) {
        return resultService.saveResult(request);
    }

    @GetMapping
    public List<ResultResponse> getAllResults() {
        return resultService.getAllResults();
    }

    @GetMapping("/student/{studentId}")
    public List<ResultResponse> getStudentResults(@PathVariable Long studentId) {
        return resultService.getStudentResults(studentId);
    }

    @GetMapping("/{id}")
    public ResultResponse getResult(@PathVariable Long id) {
        return resultService.getResult(id);
    }
}