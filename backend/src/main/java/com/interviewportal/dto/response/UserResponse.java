package com.interviewportal.dto.response;

import com.interviewportal.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String contactNumber;
    private String about;
    private String skills;
    private String resumeLink;
    private String profileImage;
    private LocalDateTime createdAt;

    public static UserResponse from(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .role(u.getRole().name())
                .contactNumber(u.getContactNumber())
                .about(u.getAbout())
                .skills(u.getSkills())
                .resumeLink(u.getResumeLink())
                .profileImage(u.getProfileImage())
                .createdAt(u.getCreatedAt())
                .build();
    }
}
