package com.example.finalproject.debitCard.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class DebitCardNotActiveException extends BusinessException {

    public DebitCardNotActiveException() {
        super("Banka kartı henüz aktif değil.");
    }
}