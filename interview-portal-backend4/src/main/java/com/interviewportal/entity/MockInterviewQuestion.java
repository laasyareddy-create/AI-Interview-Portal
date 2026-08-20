package com.interviewportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mock_interview_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockInterviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mock_interview_id", nullable = false)
    private MockInterviewTemplate mockInterview;

    @Column(nullable = false)
    private String type;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String question;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctAnswer;



    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String sampleInput;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String sampleOutput;
}