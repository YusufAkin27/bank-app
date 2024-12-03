package com.example.finalproject.validation;

import com.example.finalproject.validation.validator.CheckEmailValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CheckEmailValidator.class) // Validasyonu yapacak sınıf
@Target({ElementType.FIELD, ElementType.PARAMETER}) // Anotasyonun kullanılabileceği yerler
@Retention(RetentionPolicy.RUNTIME) // Anotasyonun çalışma zamanında da çalışacağını belirtir
public @interface CheckEmail {

    String message() default "Geçersiz e-posta adresi"; // Varsayılan hata mesajı

    Class<?>[] groups() default {};  // Validasyon grupları

    Class<? extends Payload>[] payload() default {}; // Ek bilgi taşımak için payload

}
