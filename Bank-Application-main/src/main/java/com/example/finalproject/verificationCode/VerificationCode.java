package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean isActive;
    private boolean isVerified; // Kullanıcı doğrulama kodunu onaylamış mı

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;


    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

    public void setExpiration(int minutes) {
        this.expiresAt = this.createdAt.plusMinutes(minutes);
    }
}
