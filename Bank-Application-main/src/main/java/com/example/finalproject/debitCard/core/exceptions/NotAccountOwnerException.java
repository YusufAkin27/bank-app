package com.example.finalproject.debitCard.core.exceptions;


import com.example.finalproject.customer.core.exception.BusinessException;

public class NotAccountOwnerException extends BusinessException {

    public NotAccountOwnerException() {
        super("hesabın kullanıcısı olmalısınız");
    }
}