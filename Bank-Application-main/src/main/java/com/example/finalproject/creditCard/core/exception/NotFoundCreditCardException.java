package com.example.finalproject.creditCard.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotFoundCreditCardException extends BusinessException {

    public NotFoundCreditCardException() {
        super("kredi kartı bulunamadı.");
    }
}
