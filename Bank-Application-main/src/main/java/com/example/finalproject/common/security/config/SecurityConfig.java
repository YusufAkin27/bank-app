package com.example.finalproject.common.security.config;

import com.example.finalproject.common.security.filter.CustomAuthenticationFilter;

import com.example.finalproject.customer.core.constant.CustomerConstant;
import lombok.RequiredArgsConstructor;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] AUTH_WHITELIST_FOR_SWAGGER = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
    };
    private static final String[] AUTH_WHITELIST = {
            "/bank/customers/sign-up/**",
            "/bank/authentication/login/**",
            "/bank/authentication/getRole/**",
            "/bank/authentication/logout/**",
            "/bank/authentication/reset-password/**",
            "/bank/authentication/activate/**",
            "/bank/authentication/verify/**",
            "/bank/atm/**",
    };
    private static final String[] AUTH_WHITELIST_FOR_USER = {
            "/bank/customers/delete/**",
            "/bank/customers/getProfile/**",
            "/bank/customers/edit-profile/**",
            "/bank/address/add/**",
            "/bank/customers/update/**",
            "/bank/customers/forgot-password/**",
            "/bank/accounts/checkingAccounts/add/**",
            "/bank/cards/debitCard/add/**",
            "/bank/cards/debitCard/getAll/**",
            "/bank/accounts/checkingAccounts/getAccounts/**"

    };

    private final CustomAuthenticationFilter authenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // CORS yapılandırmasını ekleyin
        http.cors().configurationSource(corsConfigurationSource());

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers(AUTH_WHITELIST_FOR_SWAGGER).permitAll()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .antMatchers(AUTH_WHITELIST_FOR_USER).hasAnyAuthority(CustomerConstant.ROLE_USER)
                .anyRequest().authenticated();
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React uygulamanızın URL'si
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // İzin verilen HTTP yöntemleri
        configuration.setAllowedHeaders(Arrays.asList("*")); // Tüm başlıkları kabul et
        configuration.setAllowCredentials(true); // Kimlik bilgilerine izin ver

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
