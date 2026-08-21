package com.interviewportal.repository;

import com.interviewportal.entity.AssessmentAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssessmentAttemptRepository extends JpaRepository<AssessmentAttempt, Long> {
    List<AssessmentAttempt> findByStudentIdOrderByAttemptedAtDesc(Long studentId);
    List<AssessmentAttempt> findAllByOrderByAttemptedAtDesc();
    List<AssessmentAttempt> findByStudentNameOrderByAttemptedAtDesc(String studentName);

    @Query("SELECT DISTINCT a.studentEmail FROM AssessmentAttempt a")
    List<String> findDistinctStudentEmails();
}
