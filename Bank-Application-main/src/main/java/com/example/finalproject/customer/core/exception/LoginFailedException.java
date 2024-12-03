package com.example.finalproject.customer.core.exception;

public class LoginFailedException extends BusinessException {

    public LoginFailedException() {
        super("Giriş işlemi sırasında bir hata oluştu. Lütfen giriş bilgilerinizi kontrol edin ve tekrar deneyin.");
    }
}
