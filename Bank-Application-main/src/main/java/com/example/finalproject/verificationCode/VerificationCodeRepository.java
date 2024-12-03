package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    Optional<VerificationCode> findByToken(String token);

    VerificationCode findTopByCustomerOrderByCreatedAtDesc(Customer customer);
}
