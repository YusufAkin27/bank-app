package com.example.finalproject.creditCard.entity;

import com.example.finalproject.creditCard.entity.base.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CreditCard extends Card {
    private BigDecimal debt;
    private BigDecimal monthlyDebt;

}
