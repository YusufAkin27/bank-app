package com.example.finalproject.common.security.token.service.impl;


import com.example.finalproject.common.entity.User;
import com.example.finalproject.common.security.token.core.exception.TokenNotFoundException;
import com.example.finalproject.common.security.token.entity.JWTToken;
import com.example.finalproject.common.security.token.repository.TokenRepository;
import com.example.finalproject.common.security.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;


import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    @Override
    public JWTToken getToken(String value) throws TokenNotFoundException {
        if (StringUtils.isEmpty(value)) {
            throw new TokenNotFoundException();
        }
        Optional<JWTToken> token = tokenRepository.findByToken(value);
        if (token.isEmpty()) {
            throw new TokenNotFoundException();
        }
        return token.get();
    }

    @Override
    public JWTToken save(JWTToken JWTToken) {
        return tokenRepository.save(JWTToken);
    }

    @Override
    public void delete(String token) throws TokenNotFoundException {
        Optional<JWTToken> optionalToken = tokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            throw new TokenNotFoundException();
        }

        tokenRepository.delete(optionalToken.get());
    }

    @Override
    @Transactional
    public void deleteAllTokensExcept(String token, User user) {
        // Kullanıcıya ait tüm tokenları al
        List<JWTToken> tokens = tokenRepository.findAllByUser(user);

        // Belirtilen token dışındaki tüm tokenları sil
        for (JWTToken jwtToken : tokens) {
            if (!jwtToken.getToken().equals(token)) {
                tokenRepository.delete(jwtToken);
            }
        }
    }

    @Override
    @Transactional
    public void deleteAllToken(User user) {
        List<JWTToken> tokens = tokenRepository.findAllByUser(user);
        tokens.clear();

    }
}
