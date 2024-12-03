package com.example.finalproject.savingAccount.core.converter;


import com.example.finalproject.savingAccount.entity.SavingAccount;
import com.example.finalproject.savingAccount.core.response.SavingAccountDTO;

import org.springframework.stereotype.Component;

@Component
public class SavingAccountConverterImpl implements SavingAccountConverter {

    @Override
    public SavingAccountDTO toDTO(SavingAccount savingAccount) {
        SavingAccountDTO savingAccountDTO = new SavingAccountDTO();
        savingAccountDTO.setId(savingAccount.getId());
        savingAccountDTO.setIbanNo(savingAccount.getIban());
        savingAccountDTO.setAccountNo(savingAccount.getAccountNumber());
        savingAccountDTO.setAccountName(savingAccount.getAccountHolderName());
        savingAccountDTO.setBalance(savingAccount.getBalance());
        savingAccountDTO.setLockedBalance(savingAccount.getLockedBalance());
        savingAccountDTO.setCreatedAt(savingAccount.getCreatedAt());
        savingAccountDTO.setSuccessRate(savingAccount.getSuccessRate());
        savingAccountDTO.setTargetAmount(savingAccount.getTargetAmount());
        savingAccountDTO.setMaturity(savingAccount.getMaturity());
        savingAccountDTO.setMaturityDate(savingAccount.getMaturityDate());
        savingAccountDTO.setAccountActivities(savingAccount.getAccountActivities());
        return savingAccountDTO;
    }

}
