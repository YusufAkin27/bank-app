package com.example.finalproject.customer.core.request;


import com.example.finalproject.customer.entity.enums.EducationLevel;
import com.example.finalproject.customer.entity.enums.JobType;
import com.example.finalproject.customer.entity.enums.Profession;
import com.example.finalproject.validation.CheckEmail;
import com.example.finalproject.validation.CheckIdentityNumber;
import com.example.finalproject.validation.CheckPassword;
import com.example.finalproject.validation.CheckPhoneNumber;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCustomerRequest {


    private String name;
    private String surname;

    @CheckEmail
    private String email;

    @CheckPassword
    private String password;
    @CheckIdentityNumber
    private String identityNumber;


    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date birthDay; // 1999-03-03

    @CheckPhoneNumber
    private String telephone;


    @Min(0)
    private BigDecimal income;

    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private Profession profession;


}
