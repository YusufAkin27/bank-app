package com.example.finalproject.debitCard.entity;


import com.example.finalproject.creditCard.entity.base.Card;
import com.example.finalproject.checkingAccount.entity.CheckingAccount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DebitCard extends Card {
    private BigDecimal lockedBalance;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CheckingAccount checkingAccount;


}