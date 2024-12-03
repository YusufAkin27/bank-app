package com.example.finalproject.savingAccount.repository;


import com.example.finalproject.savingAccount.entity.SavingAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingAccountRepository extends JpaRepository<SavingAccount,Long> {
}
