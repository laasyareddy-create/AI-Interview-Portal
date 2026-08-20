package com.interviewportal.service;

import com.interviewportal.entity.Otp;
import com.interviewportal.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public void sendOtp(String email, String purpose) {

        String otp = String.format("%06d", new Random().nextInt(1000000));

        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setPurpose(purpose);
        otpEntity.setExpiryTime(LocalDateTime.now().plusMinutes(10));
        otpEntity.setVerified(false);

        otpRepository.save(otpEntity);

        emailService.sendOtpEmail(email, otp);
    }

    @Override
    public boolean verifyOtp(String email, String otp, String purpose) {

        Optional<Otp> optionalOtp =
                otpRepository.findTopByEmailAndPurposeOrderByIdDesc(email, purpose);

        if (optionalOtp.isEmpty()) {
            return false;
        }

        Otp savedOtp = optionalOtp.get();

        if (savedOtp.isVerified()) {
            return false;
        }

        if (savedOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            return false;
        }

        if (!savedOtp.getOtp().equals(otp)) {
            return false;
        }

        savedOtp.setVerified(true);
        otpRepository.save(savedOtp);

        return true;
    }
}