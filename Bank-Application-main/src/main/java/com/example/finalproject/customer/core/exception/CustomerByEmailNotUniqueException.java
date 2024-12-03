package com.example.finalproject.customer.core.exception;

public class CustomerByEmailNotUniqueException extends BusinessException {

    public CustomerByEmailNotUniqueException() {
        super("Girdiğiniz e-posta adresine sahip bir hesap zaten mevcut. Lütfen farklı bir e-posta adresi kullanınız.");
    }
}
