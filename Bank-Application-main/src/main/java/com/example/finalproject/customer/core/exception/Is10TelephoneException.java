package com.example.finalproject.customer.core.exception;

public class Is10TelephoneException extends BusinessException {

    public Is10TelephoneException() {
        super("Geçersiz telefon numarası formatı. Lütfen 10 haneli geçerli bir telefon numarası giriniz.");
    }
}
