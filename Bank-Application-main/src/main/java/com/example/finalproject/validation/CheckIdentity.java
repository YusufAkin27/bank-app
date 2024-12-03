package com.example.finalproject.validation;

import com.example.finalproject.validation.validator.CheckIdentityValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CheckIdentityValidator.class) // Bu, validasyonu yapacak sınıfı işaret eder
@Target({ElementType.FIELD, ElementType.PARAMETER}) // Bu anotasyonu alan seviyesinde kullanmak için ayar
@Retention(RetentionPolicy.RUNTIME) // Anotasyonun çalışma zamanında da çalışacağını belirtir
public @interface CheckIdentity {

    String message() default "Geçersiz kimlik numarası";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {}; // Ek bilgi taşımak için payload

}
