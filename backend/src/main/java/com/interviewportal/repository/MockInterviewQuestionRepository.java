package com.interviewportal.repository;

import com.interviewportal.entity.MockInterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MockInterviewQuestionRepository
        extends JpaRepository<MockInterviewQuestion, Long> {

    List<MockInterviewQuestion> findByMockInterviewIdOrderByIdAsc(Long interviewId);

    long countByMockInterviewId(Long interviewId);
}