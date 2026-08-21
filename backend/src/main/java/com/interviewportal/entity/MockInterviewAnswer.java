package com.interviewportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mock_interview_answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockInterviewAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Parent Interview
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mock_interview_id", nullable = false)
    private MockInterview mockInterview;

    // Original Question
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private MockInterviewQuestion question;

    // Student's Answer
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String studentAnswer;

    // AI Evaluation
    private Integer aiScore;

    @Column(length = 100)
    private String correctness;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String feedback;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String strengths;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String improvements;
}