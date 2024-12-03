package com.example.finalproject.validation;

import com.example.finalproject.validation.validator.CheckPhoneNumberValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CheckPhoneNumberValidator.class) // Validasyonu yapacak sınıf
@Target({ElementType.FIELD, ElementType.PARAMETER}) // Alan veya parametre seviyesinde kullanmak için
@Retention(RetentionPolicy.RUNTIME) // Anotasyonun çalışma zamanında kullanılacağını belirtir
public @interface CheckPhoneNumber {
    String message() default "Geçersiz telefon numarası"; // Default hata mesajı

    Class<?>[] groups() default {}; // Validasyon grupları

    Class<? extends Payload>[] payload() default {}; // Ek bilgi taşımak için payload
}
