package com.example.finalproject.debitCard.core.exceptions;

import com.example.finalproject.customer.core.exception.BusinessException;

public class ClientIsAlreadyActiveDebitCard extends BusinessException {

    public ClientIsAlreadyActiveDebitCard() {
        super("Banka kartı zaten aktif durumda.");
    }
}