package com.example.finalproject.customer.core.exception;

public class Is11IdentityNumberException extends BusinessException {

    public Is11IdentityNumberException() {
        super("Geçersiz Kimlik Numarası.\n" +
                " Lütfen geçerli bir kimlik numarası giriniz. Kimlik numaraları 11 hanelidir.\n" +
                " Yalnızca Türkiye Cumhuriyeti vatandaşlarına aittir. Kimlik numarasını doğru girdiğinizden emin olunuz.");
    }
}
