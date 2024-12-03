package com.example.finalproject.customer.core.exception;

public class AgeLimitException extends BusinessException {

    public AgeLimitException() {
        super("Kayıt işlemi için yaşınızın en az 18 olması gerekmektedir.");
    }
}
