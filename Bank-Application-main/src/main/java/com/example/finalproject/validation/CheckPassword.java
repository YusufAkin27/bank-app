package com.example.finalproject.validation;

import com.example.finalproject.validation.validator.CheckPasswordValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CheckPasswordValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckPassword {
    String message() default "Geçersiz şifre formatı"; // Default hata mesajı

    Class<?>[] groups() default {}; // Validasyon grupları

    Class<? extends Payload>[] payload() default {}; // Ek bilgi taşımak için payload
}
