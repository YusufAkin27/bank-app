package com.example.finalproject.checkingAccount.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotFoundCheckingAccountException extends BusinessException {

    public NotFoundCheckingAccountException() {
        super("Checking hesabı bulunamadı.");
    }
}