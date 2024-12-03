package com.example.finalproject.customer.core.exception;

public class IncorrectPasswordException extends BusinessException {
    public IncorrectPasswordException() {
        super("Girilen şifre hatalı. Lütfen şifrenizi kontrol ederek tekrar deneyin.");
    }
}
