package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class IncorrectCodeException extends BusinessException {
    public IncorrectCodeException() {
        super("Girilen kod hatalı. Lütfen kodunuzu kontrol ederek tekrar deneyin.");
    }
}
