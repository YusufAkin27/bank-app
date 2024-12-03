package com.example.finalproject.customer.core.exception;

public class CheckingEmailException extends BusinessException {

    public CheckingEmailException() {
        super("Geçersiz bir e-posta adresi girdiniz. Lütfen geçerli bir e-posta adresi kullanınız.");
    }
}
