package com.example.finalproject.customer.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.*;


import com.example.finalproject.debitCard.entity.DebitCard;
import com.example.finalproject.savingAccount.entity.SavingAccount;

import com.example.finalproject.address.entity.Address;

import com.example.finalproject.checkingAccount.entity.CheckingAccount;
import com.example.finalproject.customer.entity.enums.EducationLevel;
import com.example.finalproject.customer.entity.enums.JobType;
import com.example.finalproject.customer.entity.enums.Profession;
import com.example.finalproject.verificationCode.VerificationCode;
import com.example.finalproject.creditCard.entity.CreditCard;
import com.example.finalproject.common.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customer extends User {

    private String identityNumber;
    private String name;
    private String surname;
    private String telephone;
    private BigDecimal income;
    private String email;

    @Temporal(TemporalType.DATE)
    private Date birthDay;

    private LocalDate createdAt;

    private boolean isActive = false; // Varsayılan olarak false


    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private Profession profession;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "activation_token_id")
    private VerificationCode activationCode;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "reset_token_id")
    private VerificationCode resetPasswordToken;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "session_confirmation_code_id")
    private VerificationCode sessionConfirmationCode;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CheckingAccount> checkingAccounts = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<SavingAccount> savingAccounts = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CreditCard> creditCards = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DebitCard> debitCards = new ArrayList<>();
}
