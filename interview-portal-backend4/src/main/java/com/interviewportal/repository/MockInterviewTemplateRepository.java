package com.interviewportal.repository;

import com.interviewportal.entity.MockInterviewTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockInterviewTemplateRepository
        extends JpaRepository<MockInterviewTemplate, Long> {

    List<MockInterviewTemplate> findAllByOrderByCreatedAtDesc();

    List<MockInterviewTemplate> findByCategoryIgnoreCaseOrderByCreatedAtDesc(
            String category
    );
}