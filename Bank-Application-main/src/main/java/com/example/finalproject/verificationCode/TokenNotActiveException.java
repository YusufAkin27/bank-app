package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class TokenNotActiveException extends BusinessException {

    public TokenNotActiveException() {
        super("Bu doğrulama kodu artık geçerli değil.");
    }
}
