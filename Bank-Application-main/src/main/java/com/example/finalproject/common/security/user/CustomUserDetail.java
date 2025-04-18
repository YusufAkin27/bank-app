package com.example.finalproject.common.security.user;

import com.example.finalproject.common.entity.User;
import com.example.finalproject.customer.entity.Role;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Getter
@Setter
public class CustomUserDetail implements UserDetails {

    private final User user;

    private String token;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream().map(this::createSimpleGrantedAuthorities).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getHashPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserNumber();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    private SimpleGrantedAuthority createSimpleGrantedAuthorities(Role role) {
        return new SimpleGrantedAuthority(role.getName());
    }
}

