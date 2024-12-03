package com.example.finalproject.validation.validator;

import com.example.finalproject.validation.CheckEmail;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class CheckEmailValidator implements ConstraintValidator<CheckEmail, String> {

    // E-posta formatı için bir regex deseni
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    @Override
    public void initialize(CheckEmail constraintAnnotation) {
        // Başlangıçta yapılacak özel bir şey yok
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        // E-posta null ise hata fırlat
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            context.disableDefaultConstraintViolation(); // Varsayılan hata mesajını devre dışı bırak
            context.buildConstraintViolationWithTemplate("Hatalı e-posta formatı.") // Özelleştirilmiş hata mesajı
                    .addConstraintViolation(); // Hata mesajını ekle
            return false; // Geçersiz
        }
        return true; // Geçerli
    }

}
