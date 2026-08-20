package com.interviewportal.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_summary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private User student;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String overallFeedback;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "analytics_strengths",
            joinColumns = @JoinColumn(name = "summary_id")
    )
    @Column(name = "strength")
    private java.util.List<String> strengths;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "analytics_improvements",
            joinColumns = @JoinColumn(name = "summary_id")
    )
    @Column(name = "improvement")
    private java.util.List<String> improvements;

    private LocalDateTime updatedAt;
}