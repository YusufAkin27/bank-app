package com.example.finalproject.debitCard.core.converter;

import com.example.finalproject.debitCard.core.converter.DebitCardConverter;
import com.example.finalproject.debitCard.core.response.DebitCardDTO;
import com.example.finalproject.debitCard.entity.DebitCard;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier
public class DebitCardConverterImpl implements DebitCardConverter {
    @Override
    public DebitCardDTO DebitCardDTO(DebitCard debitCard) {
        return DebitCardDTO.builder()
                .cardName(debitCard.getNameAndSurname())
                .cardNumber(debitCard.getCardNumber())
                .id(debitCard.getId())
                .cvv(debitCard.getCvv())
                .iban(debitCard.getIban())
                .expiryDate(debitCard.getExpiryDate())
                .password(debitCard.getPassword())
                .isActive(debitCard.isActive())
                .lockedBalance(debitCard.getLockedBalance())
                .balance(debitCard.getBalance())
                .checkingAccountNu(debitCard.getCheckingAccount().getAccountNumber())
                .activity(debitCard.getActivityList())
                .build();
    }


}