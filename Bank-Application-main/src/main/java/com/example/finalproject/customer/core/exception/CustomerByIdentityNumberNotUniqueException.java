package com.example.finalproject.customer.core.exception;

public class CustomerByIdentityNumberNotUniqueException extends BusinessException {

    public CustomerByIdentityNumberNotUniqueException() {
        super("Girdiğiniz kimlik numarasına sahip bir hesap zaten mevcut. Lütfen farklı bir kimlik numarası kullanınız.");
    }
}
