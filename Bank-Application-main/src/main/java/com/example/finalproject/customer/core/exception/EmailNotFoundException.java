package com.example.finalproject.customer.core.exception;

public class EmailNotFoundException extends BusinessException {
    public EmailNotFoundException() {
        super("Belirtilen e-posta adresi sistemde bulunamadı. Lütfen bilgilerinizi kontrol edin.");
    }
}
