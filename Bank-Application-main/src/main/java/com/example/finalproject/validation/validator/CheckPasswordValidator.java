package com.example.finalproject.validation.validator;

import com.example.finalproject.validation.CheckPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class CheckPasswordValidator implements ConstraintValidator<CheckPassword, String> {

    // Şifre formatı: Sadece 6 rakamdan oluşmalıdır
    private static final Pattern PASSWORD_PATTERN =
            Pattern.compile("^\\d{6}$");

    @Override
    public void initialize(CheckPassword constraintAnnotation) {
        // Başlangıçta yapılacak özel bir şey yok
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        // Şifre null veya geçersiz formatta ise hata mesajı göster
        if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
            context.disableDefaultConstraintViolation(); // Varsayılan hata mesajını devre dışı bırak
            context.buildConstraintViolationWithTemplate("Şifre, yalnızca 6 rakamdan oluşmalıdır.") // Özelleştirilmiş hata mesajı
                    .addConstraintViolation(); // Hata mesajını ekle
            return false; // Geçersiz
        }
        return true; // Geçerli
    }

}
