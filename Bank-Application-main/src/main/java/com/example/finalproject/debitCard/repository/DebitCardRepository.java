package com.example.finalproject.debitCard.repository;

import com.example.finalproject.debitCard.core.exceptions.NotFoundDebitCardException;

import com.example.finalproject.debitCard.entity.DebitCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitCardRepository extends JpaRepository<DebitCard, Long> {
    DebitCard findByIban(String iban);
    DebitCard findById(long id) throws NotFoundDebitCardException;
    DebitCard findByCardNumber(String cardNumber);

    boolean existsByCardNumber(String cardNumber);

    boolean existsByIban(String iban);
}
