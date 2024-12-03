package com.example.finalproject.common.entity;

import com.example.finalproject.common.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "login_history")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Giriş yapan kullanıcı

    private String ipAddress; // Giriş yapılan IP adresi

    private LocalDateTime loginTime; // Giriş zamanı
}
