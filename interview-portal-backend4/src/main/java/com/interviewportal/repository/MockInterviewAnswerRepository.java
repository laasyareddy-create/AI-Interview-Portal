package com.interviewportal.repository;

import com.interviewportal.entity.MockInterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MockInterviewAnswerRepository
        extends JpaRepository<MockInterviewAnswer, Long> {

    List<MockInterviewAnswer> findByMockInterviewId(Long mockInterviewId);

    List<MockInterviewAnswer> findByMockInterviewStudentId(Long studentId);

    @Transactional
    void deleteByQuestion_Id(Long questionId);

}