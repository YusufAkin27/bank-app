package com.example.finalproject.verificationCode;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationCodeRules {

    private final VerificationCodeRepository verificationCodeRepository;
}
