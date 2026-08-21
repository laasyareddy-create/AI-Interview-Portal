package com.interviewportal.repository;

import com.interviewportal.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    List<Assessment> findAllByOrderByCreatedAtDesc();

    List<Assessment> findByCategoryAndDifficultyOrderByCreatedAtDesc(
            String category,
            String difficulty
    );
}