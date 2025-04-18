package com.example.finalproject.debitCard.core.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDebitCardRequest {
    private long checkingAccountId;
    private String password;
}