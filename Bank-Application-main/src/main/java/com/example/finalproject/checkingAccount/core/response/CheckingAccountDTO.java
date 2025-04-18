package com.example.finalproject.checkingAccount.core.response;

import com.example.finalproject.savingAccount.entity.enums.AccountType;

import com.example.finalproject.debitCard.core.response.DebitCardDTO;
import com.example.finalproject.creditCard.entity.base.Activity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckingAccountDTO {
    private long id;
    private String AccountName;
    private String ibanNo;
    private BigDecimal balance;
    private BigDecimal lockedBalance;
    private String accountNo;
    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    private LocalDate createdAt;
    private List<Activity> accountActivities = new ArrayList<>();
    private String branchName;
    private boolean isActive;
    private DebitCardDTO debitCard;

}