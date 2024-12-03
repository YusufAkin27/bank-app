package com.example.finalproject.common.security.token.entity;

import com.example.finalproject.common.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
public class JWTToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Date expiryDate;

    // Kullanıcı ile ilişki
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Kullanıcıyla ilişkilendirme
}
