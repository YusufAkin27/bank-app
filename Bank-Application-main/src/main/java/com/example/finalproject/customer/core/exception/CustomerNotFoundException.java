package com.example.finalproject.customer.core.exception;

public class CustomerNotFoundException extends BusinessException {

    public CustomerNotFoundException() {
        super("Belirtilen müşteri bulunamadı. Lütfen giriş bilgilerinizi kontrol edin.");
    }
}
