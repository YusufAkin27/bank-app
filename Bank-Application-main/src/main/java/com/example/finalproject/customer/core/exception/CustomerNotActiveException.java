package com.example.finalproject.customer.core.exception;

public class CustomerNotActiveException extends BusinessException {

    public CustomerNotActiveException() {
        super("Müşteri hesabı henüz etkinleştirilmemiştir. Lütfen hesabınızı aktive edin.");
    }
}
