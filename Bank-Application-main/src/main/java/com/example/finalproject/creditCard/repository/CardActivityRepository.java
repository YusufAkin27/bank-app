package com.example.finalproject.creditCard.repository;

import com.example.finalproject.creditCard.entity.base.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardActivityRepository extends JpaRepository<Activity, Long> {
}
