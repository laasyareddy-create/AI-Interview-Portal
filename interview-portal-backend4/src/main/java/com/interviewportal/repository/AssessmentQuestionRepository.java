package com.interviewportal.repository;

import com.interviewportal.entity.Assessment;
import com.interviewportal.entity.AssessmentQuestion;
import com.interviewportal.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentQuestionRepository
        extends JpaRepository<AssessmentQuestion, Long> {

    List<AssessmentQuestion> findByAssessment(Assessment assessment);

    List<AssessmentQuestion> findByQuestion(Question question);

    void deleteByAssessmentAndQuestion(
            Assessment assessment,
            Question question
    );
}