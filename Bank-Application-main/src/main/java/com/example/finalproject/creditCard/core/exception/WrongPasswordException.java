package com.example.finalproject.creditCard.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class WrongPasswordException extends BusinessException {
    public WrongPasswordException() {
        super("şifre hatalı");
    }
}
