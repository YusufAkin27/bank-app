package com.example.finalproject.address.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class AddressNotFoundException extends BusinessException {

    public AddressNotFoundException() {
        super("adres bulunamadı");
    }
}
