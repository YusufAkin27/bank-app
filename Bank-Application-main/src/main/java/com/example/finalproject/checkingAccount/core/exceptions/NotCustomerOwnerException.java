package com.example.finalproject.checkingAccount.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class NotCustomerOwnerException extends BusinessException {

    public NotCustomerOwnerException() {
        super("check hesabı size ait değil");
    }
}