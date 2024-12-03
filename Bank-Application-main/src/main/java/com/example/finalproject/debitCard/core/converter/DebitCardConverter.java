package com.example.finalproject.debitCard.core.converter;

import com.example.finalproject.debitCard.core.response.DebitCardDTO;
import com.example.finalproject.debitCard.entity.DebitCard;

public interface DebitCardConverter {
    DebitCardDTO DebitCardDTO(DebitCard debitCard);

}