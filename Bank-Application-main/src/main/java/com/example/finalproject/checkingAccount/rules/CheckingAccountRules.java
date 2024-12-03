package com.example.finalproject.checkingAccount.rules;


import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.customer.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CheckingAccountRules {


    public boolean addressNotEmpty(Customer customer) throws AddressCannotBeEmptyException {
        if (customer.getAddresses() == null) {
            throw new AddressCannotBeEmptyException();
        }
        return false;
    }
}