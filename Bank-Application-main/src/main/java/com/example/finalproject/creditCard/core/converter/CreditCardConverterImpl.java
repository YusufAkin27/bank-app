package com.example.finalproject.creditCard.core.converter;

import com.example.finalproject.creditCard.core.response.CreditCardDTO;
import com.example.finalproject.creditCard.entity.CreditCard;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier
public class CreditCardConverterImpl implements CreditCardConverter {
    @Override
    public CreditCardDTO toDTO(CreditCard creditCard) {
        return CreditCardDTO.builder()
                .nameAndSurname(creditCard.getNameAndSurname())
                .cardNumber(creditCard.getCardNumber())
                .id(creditCard.getId())
                .cvv(creditCard.getCvv())
                .iban(creditCard.getIban())
                .expiryDate(creditCard.getExpiryDate())
                .password(creditCard.getPassword())
                .isActive(creditCard.isActive())
                .balance(creditCard.getBalance())
                .activityList(creditCard.getActivityList())
                .monthlyDebt(creditCard.getMonthlyDebt())
                .debt(creditCard.getDebt())
                .customer(creditCard.getCustomer())
                .build();
    }
}
