package com.interviewportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String otp) {

        System.out.println("Sending OTP to: " + to + " OTP: " + otp);

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("AI Interview Portal - Email Verification");

        message.setText(
                "Welcome to AI Interview Portal.\n\n"
                        + "Your One Time Password (OTP) is:\n\n"
                        + otp
                        + "\n\nThis OTP is valid for 10 minutes."
                        + "\n\nDo not share this OTP with anyone.");

        mailSender.send(message);
    }
}