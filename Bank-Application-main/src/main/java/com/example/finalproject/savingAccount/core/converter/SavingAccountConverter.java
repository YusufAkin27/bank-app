package com.example.finalproject.savingAccount.core.converter;

import com.example.finalproject.savingAccount.entity.SavingAccount;
import com.example.finalproject.savingAccount.core.response.SavingAccountDTO;


public interface SavingAccountConverter {
    SavingAccountDTO toDTO(SavingAccount savingAccount);
}
