package com.example.finalproject.savingAccount.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotFoundSavingAccountException extends BusinessException {

    public NotFoundSavingAccountException() {
        super("Tasarruf hesabı bulunamadı.");
    }
}
