package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class InvalidTokenException extends BusinessException {

    public InvalidTokenException() {
        super("Geçersiz veya süresi dolmuş bir token ile işlem yapılmaya çalışıldı. Lütfen geçerli bir token kullanarak tekrar deneyin.");
    }
}
