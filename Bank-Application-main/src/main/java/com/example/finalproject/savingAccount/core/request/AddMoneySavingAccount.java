package com.example.finalproject.savingAccount.core.request;

import com.example.finalproject.savingAccount.entity.enums.Maturity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddMoneySavingAccount {
    private long savingAccountId;
    private Maturity maturity;
    private BigDecimal amount;
}
