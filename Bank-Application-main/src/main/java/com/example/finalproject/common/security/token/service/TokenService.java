package com.example.finalproject.common.security.token.service;


import com.example.finalproject.common.entity.User;
import com.example.finalproject.common.security.token.core.exception.TokenNotFoundException;
import com.example.finalproject.common.security.token.entity.JWTToken;

public interface TokenService {

    JWTToken getToken(String token) throws TokenNotFoundException;

    JWTToken save(JWTToken JWTToken);

    void delete(String token) throws TokenNotFoundException;

    // Kullanıcının bir tokenı hariç diğerlerini sil
    void deleteAllTokensExcept(String token, User user);
    void deleteAllToken(User user);

}
