package com.example.finalproject.creditCard.core.converter;

import com.example.finalproject.creditCard.core.response.CreditCardDTO;
import com.example.finalproject.creditCard.entity.CreditCard;

public interface CreditCardConverter {
    CreditCardDTO toDTO(CreditCard creditCard);
}
