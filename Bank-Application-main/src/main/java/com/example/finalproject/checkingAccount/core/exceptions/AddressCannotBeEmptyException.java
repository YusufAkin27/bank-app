package com.example.finalproject.checkingAccount.core.exceptions;


import com.example.finalproject.customer.core.exception.BusinessException;

public class AddressCannotBeEmptyException extends BusinessException {

    public AddressCannotBeEmptyException() {
        super("Müşteri adresi doğrulaması yapılmadan hesap açılamaz.");
    }
}