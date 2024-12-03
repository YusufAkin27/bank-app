package com.example.finalproject.validation.validator;

import com.example.finalproject.validation.CheckPhoneNumber;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class CheckPhoneNumberValidator implements ConstraintValidator<CheckPhoneNumber, String> {

    // Türkiye telefon numarası formatı için bir regex deseni
    private static final Pattern PHONE_NUMBER_PATTERN =
            Pattern.compile("^\\+90\\d{10}$");

    @Override
    public void initialize(CheckPhoneNumber constraintAnnotation) {
        // Başlangıçta yapılacak özel bir şey yok
    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        // Telefon numarası null veya geçersiz formatta ise hata mesajı göster
        if (phoneNumber == null || !PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches()) {
            context.disableDefaultConstraintViolation(); // Varsayılan hata mesajını devre dışı bırak
            context.buildConstraintViolationWithTemplate("Geçersiz telefon numarası formatı.") // Özelleştirilmiş hata mesajı
                    .addConstraintViolation(); // Hata mesajını ekle
            return false; // Geçersiz
        }
        return true; // Geçerli
    }

}
