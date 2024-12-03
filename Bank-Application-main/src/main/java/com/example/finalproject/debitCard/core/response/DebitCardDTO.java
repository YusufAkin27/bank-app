package com.example.finalproject.debitCard.core.response;


import com.example.finalproject.creditCard.entity.base.Activity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DebitCardDTO {
    private long id;
    private String cardNumber;
    private String cardName;
    private BigDecimal balance;
    private BigDecimal lockedBalance;
    private String iban;
    private String password;
    private String cvv;
    private LocalDate expiryDate;
    private boolean isActive = true;
    private String checkingAccountNu;
    private List<Activity> activity =new ArrayList<>();
}