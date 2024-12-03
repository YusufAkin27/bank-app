package com.example.finalproject.customer.core.exception;

public class CustomerAlreadyActiveException extends BusinessException {
    public CustomerAlreadyActiveException() {
        super("Bu kullanıcı zaten aktif durumda. Lütfen mevcut hesabınızı kullanarak işleminizi devam ettirin.");
    }
}
