package com.example.finalproject.customer.core.exception;

public class CustomerByTelephoneNotUniqueException extends BusinessException {

    public CustomerByTelephoneNotUniqueException() {
        super("Girdiğiniz telefon numarasına sahip bir hesap zaten mevcut. Lütfen farklı bir telefon numarası kullanınız.");
    }
}
