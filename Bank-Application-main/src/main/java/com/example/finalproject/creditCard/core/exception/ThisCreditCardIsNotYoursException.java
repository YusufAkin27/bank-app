package com.example.finalproject.creditCard.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class ThisCreditCardIsNotYoursException extends BusinessException {

    public ThisCreditCardIsNotYoursException() {
        super("Bu kredi kartı size ait değil.");
    }
}
