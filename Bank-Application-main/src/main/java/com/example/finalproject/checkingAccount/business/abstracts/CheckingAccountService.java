package com.example.finalproject.checkingAccount.business.abstracts;


import com.example.finalproject.savingAccount.core.request.CreateCheckingAccountRequest;

import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.creditCard.entity.base.Activity;
import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotCustomerOwnerException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.checkingAccount.core.response.CheckingAccountDTO;
import com.example.finalproject.customer.core.exception.CustomerNotActiveException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.response.ServiceResponse;

import java.util.List;


public interface CheckingAccountService {
    ServiceResponse add(long customerId,CreateCheckingAccountRequest createCheckingAccountRequest) throws
            CustomerNotFoundException, AddressCannotBeEmptyException;

    ServiceResponse delete(long customerId,long checkingAccountId) throws NotFoundCheckingAccountException, CustomerNotFoundException, NotCustomerOwnerException, CustomerNotActiveException;




    List<CheckingAccountDTO> getAllWithPagination(int page, int pageSize);



    List<Activity> activateWithPagination(long customerId,long checkingAccountId,int page, int pageSize) throws CustomerNotFoundException, NotAccountOwnerException;
}