package com.example.finalproject.debitCard.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class AccountAlreadyHasADebitCardException extends BusinessException {

    public AccountAlreadyHasADebitCardException() {
        super("Hesabın zaten bir banka kartı var.");
    }
}