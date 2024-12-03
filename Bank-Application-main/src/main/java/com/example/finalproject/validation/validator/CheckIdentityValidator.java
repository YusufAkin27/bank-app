package com.example.finalproject.validation.validator;



import com.example.finalproject.validation.CheckIdentityNumber;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class CheckIdentityValidator implements ConstraintValidator<CheckIdentityNumber, String> {

    @Override
    public void initialize(CheckIdentityNumber constraintAnnotation) {
        // Başlangıçta yapılacak özel bir şey yok
    }

    @Override
    public boolean isValid(String identity, ConstraintValidatorContext context) {
        // Eğer kimlik numarası null veya boşsa geçersiz sayılır
        if (identity == null || identity.length() != 11) {
            context.disableDefaultConstraintViolation(); // Varsayılan hata mesajını devre dışı bırak
            context.buildConstraintViolationWithTemplate("Kimlik numarası 11 haneli olmalıdır.") // Özelleştirilmiş hata mesajı
                    .addConstraintViolation(); // Hata mesajını ekle
            return false;
        }

        // İlk rakam sıfır olamaz
        if (identity.charAt(0) == '0') {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Kimlik numarasının ilk rakamı sıfır olamaz.")
                    .addConstraintViolation();
            return false;
        }
        return true;

    }
}
