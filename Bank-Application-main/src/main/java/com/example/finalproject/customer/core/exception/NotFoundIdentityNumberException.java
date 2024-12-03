package com.example.finalproject.customer.core.exception;

public class NotFoundIdentityNumberException extends BusinessException {

    public NotFoundIdentityNumberException() {
        super("Girilen kimlik numarasına sahip bir kullanıcı bulunamadı. Lütfen kimlik numaranızı kontrol edin.");
    }
}
