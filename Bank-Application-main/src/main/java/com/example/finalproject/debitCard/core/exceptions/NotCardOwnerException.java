package com.example.finalproject.debitCard.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotCardOwnerException extends BusinessException {

    public NotCardOwnerException() {
        super("Kartın kullanıcısı olmalısınız");
    }
}