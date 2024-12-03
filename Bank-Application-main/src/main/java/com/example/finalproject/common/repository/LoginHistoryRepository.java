package com.example.finalproject.common.repository;

import com.example.finalproject.common.entity.LoginHistory;
import com.example.finalproject.common.entity.User;
import com.example.finalproject.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory,Long> {
    Optional<LoginHistory> findTopByUserOrderByLoginTimeDesc(User user);

    void deleteByUserAndIpAddress(Customer customer, String ipAddress);
}
