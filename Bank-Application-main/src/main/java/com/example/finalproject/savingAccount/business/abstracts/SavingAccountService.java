package com.example.finalproject.savingAccount.business.abstracts;


import com.example.finalproject.savingAccount.core.exception.NotFoundSavingAccountException;
import com.example.finalproject.savingAccount.core.exception.isBaseSavingAccountException;
import com.example.finalproject.savingAccount.core.request.AddMoneySavingAccount;
import com.example.finalproject.savingAccount.core.request.CreateSavingAccountRequest;

import com.example.finalproject.savingAccount.core.response.SavingAccountDTO;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.creditCard.entity.base.Activity;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.response.ServiceResponse;

import java.util.List;


public interface SavingAccountService {
    ServiceResponse add(long customerId,CreateSavingAccountRequest createSavingAccountRequest) throws CustomerNotFoundException, isBaseSavingAccountException, NotAccountOwnerException;

    ServiceResponse delete(long customerId,long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException;

    List<Activity> getActivities(long customerId,long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException;

    List<SavingAccountDTO> getAll(long id);

    ServiceResponse addMoney(long customerId,AddMoneySavingAccount addMoneySavingAccount) throws NotFoundSavingAccountException, NotAccountOwnerException;

    ServiceResponse doActive(long customerId,long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException;


}
