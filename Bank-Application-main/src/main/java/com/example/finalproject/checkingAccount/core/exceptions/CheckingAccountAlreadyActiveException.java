package com.example.finalproject.checkingAccount.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class CheckingAccountAlreadyActiveException extends BusinessException {

    public CheckingAccountAlreadyActiveException() {
        super("Kontrol hesabı zaten aktif.");
    }
}