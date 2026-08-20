package com.interviewportal.dto.response;

import com.interviewportal.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private String name;
    private String email;
    private Role role;
    private String contactNumber;
    private String about;
    private String skills;
    private String resumeLink;
    private String profileImage;
}