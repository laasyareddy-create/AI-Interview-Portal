package com.interviewportal.repository;

import com.interviewportal.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    List<Result> findByStudentIdOrderByAttemptedAtDesc(Long studentId);

}