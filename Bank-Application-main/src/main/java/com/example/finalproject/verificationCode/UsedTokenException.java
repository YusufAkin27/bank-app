package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class UsedTokenException extends BusinessException {

    public UsedTokenException() {
        super("Bu kod zaten kullanılmış. Lütfen yeni bir kod kullanın.");
    }
}
