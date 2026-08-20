package com.interviewportal.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(max = 100)
    private String name;

    @Size(max = 20)
    private String contactNumber;

    private String about;

    private String skills;

    private String resumeLink;

    private String profileImage;
}