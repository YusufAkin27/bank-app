package com.example.finalproject.customer.core.exception;

public class IdentityNotFoundException extends BusinessException {
    public IdentityNotFoundException() {
        super("Belirtilen kimlik numarası sistemde bulunamadı. Lütfen kimlik numaranızı kontrol ederek tekrar deneyin.");
    }
}
