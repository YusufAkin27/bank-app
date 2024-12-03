package com.example.finalproject.savingAccount.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class isBaseSavingAccountException extends BusinessException {

    public isBaseSavingAccountException() {
        super("Tasarruf hesabı zaten açılmıştır.");
    }
}
