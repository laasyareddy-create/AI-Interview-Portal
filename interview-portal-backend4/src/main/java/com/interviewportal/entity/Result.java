package com.interviewportal.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private String studentName;

    private String studentEmail;

    private Long assessmentId;

    private String assessmentName;

    private String category;

    private String difficulty;

    private Integer score;

    private Integer correctAnswers;

    private Integer wrongAnswers;

    private Integer totalQuestions;

    private Integer percentage;

    @CreationTimestamp
    private LocalDateTime attemptedAt;
}