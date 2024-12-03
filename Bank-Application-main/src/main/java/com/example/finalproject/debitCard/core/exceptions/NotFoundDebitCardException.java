package com.example.finalproject.debitCard.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotFoundDebitCardException extends BusinessException {

    public NotFoundDebitCardException() {
        super("Banka kartı bulunamadı.");
    }
}