package com.interviewportal.repository;

import com.interviewportal.entity.AnalyticsSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalyticsSummaryRepository extends JpaRepository<AnalyticsSummary, Long> {

    Optional<AnalyticsSummary> findByStudentId(Long studentId);

}