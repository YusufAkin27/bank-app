package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class ExpiredTokenException extends BusinessException {

    public ExpiredTokenException() {
        super("Bu doğrulama kodunun süresi dolmuş.");
    }
}
