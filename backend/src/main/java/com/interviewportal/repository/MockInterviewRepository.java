package com.interviewportal.repository;

import com.interviewportal.entity.MockInterview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MockInterviewRepository extends JpaRepository<MockInterview, Long> {

    List<MockInterview> findByStudentIdOrderByCompletedAtDesc(Long studentId);

    List<MockInterview> findAllByOrderByCompletedAtDesc();

    List<MockInterview> findByStudentName(String studentName);

    @Transactional
    void deleteByTemplateId(Long templateId);

}