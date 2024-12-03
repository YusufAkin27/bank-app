package com.example.finalproject.checkingAccount.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class SendingMissingDataException extends BusinessException {

    public SendingMissingDataException() {
        super("Eksik veya yanlış veri gönderdiniz, lütfen tekrar deneyin.");
    }
}