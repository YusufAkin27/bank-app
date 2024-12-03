package com.example.finalproject.checkingAccount.core.converter;

import com.example.finalproject.checkingAccount.core.response.CheckingAccountDTO;
import com.example.finalproject.checkingAccount.entity.CheckingAccount;
import org.springframework.context.annotation.Scope;

@Scope("prototype")
public interface CheckingAccountConverter {
    CheckingAccountDTO toDTO(CheckingAccount checkingAccount);
}