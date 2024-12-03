package com.example.finalproject.customer.core.exception;

public class UserNotActiveException extends BusinessException {

    public UserNotActiveException() {
        super("Hesabınız aktif değil. Lütfen e-posta onayınızı kontrol edin ve hesabınızı etkinleştirin.");
    }
}
