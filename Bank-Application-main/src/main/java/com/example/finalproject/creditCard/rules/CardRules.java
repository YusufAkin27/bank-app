package com.example.finalproject.creditCard.rules;

import com.example.finalproject.checkingAccount.business.concretes.CheckingAccountManager;
import com.example.finalproject.creditCard.core.exception.LimitException;
import com.example.finalproject.debitCard.core.exceptions.AccountAlreadyHasADebitCardException;
import com.example.finalproject.creditCard.entity.CreditCard;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;


import com.example.finalproject.creditCard.repository.CreditCardRepository;

import com.example.finalproject.checkingAccount.entity.CheckingAccount;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.debitCard.entity.DebitCard;
import com.example.finalproject.debitCard.repository.DebitCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CardRules {

    private final CheckingAccountManager checkingAccountManager;

    private final CreditCardRepository creditCardRepository;

    private final DebitCardRepository debitCardRepository;

    public boolean AlreadyAccountHasADebitCard(long checkingAccountId) throws NotFoundCheckingAccountException, AccountAlreadyHasADebitCardException {
        CheckingAccount checkingAccount = checkingAccountManager.findByIdCheckingAccount(checkingAccountId);
        if (checkingAccount.getDebitCard() != null) {
            throw new AccountAlreadyHasADebitCardException();
        }
        return true;
    }

    public boolean withdrawalMoney(CreditCard creditCard, BigDecimal amount) throws LimitException {
        Customer customer = creditCard.getCustomer();
        BigDecimal currentDebt = creditCard.getDebt();
        BigDecimal customerIncome = customer.getIncome();
        BigDecimal totalDebtLimit;

        if (customerIncome.compareTo(new BigDecimal("8500")) == 0) {
            totalDebtLimit = new BigDecimal("10000");
        } else if (customerIncome.compareTo(new BigDecimal("12000")) >= 0) {
            totalDebtLimit = new BigDecimal("30000");
        } else {
            totalDebtLimit = new BigDecimal("17000");
        }

        BigDecimal newDebt = currentDebt.add(amount);

        if (newDebt.compareTo(totalDebtLimit) > 0) {
            throw new LimitException();
        }

        return true;
    }

    public boolean isCardNumberUnique(String cardNumber)   {
        CreditCard existingCreditCard = creditCardRepository.findByCardNumber(cardNumber);
        if (existingCreditCard != null) {
          return false;
        }

        DebitCard existingDebitCard = debitCardRepository.findByCardNumber(cardNumber);
        if (existingDebitCard != null) {
          return false;
        }

        return true;
    }
    public boolean isIbanUnique(String iban)   {
        CreditCard existingCreditCard = creditCardRepository.findByIban(iban);
        if (existingCreditCard != null) {
            return false;
        }

        DebitCard existingDebitCard = debitCardRepository.findByIban(iban);
        if (existingDebitCard != null) {
            return false;
        }

        return true;
    }


}
