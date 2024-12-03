package com.example.finalproject.customer.controller;

import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.debitCard.core.exceptions.AccountAlreadyHasADebitCardException;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.common.security.user.CustomUserDetail;

import com.example.finalproject.customer.business.abstarcts.AuthService;
import com.example.finalproject.customer.business.abstarcts.ResetPasswordService;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.core.request.ActivateCodeRequest;
import com.example.finalproject.customer.core.request.IdentityRequest;
import com.example.finalproject.customer.core.request.ResetPasswordRequest;

import com.example.finalproject.customer.core.request.LoginFormRequest;
import com.example.finalproject.response.ServiceResponse;
import com.example.finalproject.verificationCode.*;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/bank/authentication")
@Validated
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;

    private final ResetPasswordService resetPasswordService;

    @PostMapping("/login")
    public ServiceResponse login(
            @RequestHeader(value = "X-Forwarded-For", required = false) String xForwardedFor,
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody @Valid LoginFormRequest loginFormRequest) {

        // IP adresini al
        String ipAddress = getClientIpAddress(xForwardedFor, request);
        loginFormRequest.setIpAddress(ipAddress);

        try {
            // Kullanıcı girişini doğrula ve token al
            ServiceResponse serviceResponse = authService.login(
                    loginFormRequest.getIdentityNumber(),
                    loginFormRequest.getPassword(),
                    ipAddress
            );

            if (serviceResponse.isSuccess()) {
                String userRole = authService.getUserRoles(loginFormRequest.getIdentityNumber());
                String token = serviceResponse.getMessage(); // Token al

                // Çerezleri ayarla
                setCookie(response, "userRole", userRole);
                setCookie(response, "authToken", token);
            }

            return serviceResponse;
        } catch (BusinessException e) { // Tüm özel exception'ları BusinessException'a taşıyabilirsiniz
            return new ServiceResponse(e.getMessage(), false);
        }
    }

    private String getClientIpAddress(String xForwardedFor, HttpServletRequest request) {
        return (xForwardedFor != null) ? xForwardedFor.split(",")[0] : request.getRemoteAddr();
    }

    private void setCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);   // Güvenlik için sadece HTTP üzerinden erişilebilir
        cookie.setPath("/");        // Çerezin geçerli olduğu yol
        cookie.setMaxAge(60 * 60 * 24); // Çerezin geçerlilik süresi (1 gün)
        response.addCookie(cookie);
    }

    @PostMapping("/logout")
    public ServiceResponse logout(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail, HttpServletResponse response) {
        return authService.logout(userDetail.getUser().getId(), response);

    }


    @GetMapping("/getRole")
    public String getRole(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail) throws EmailNotFoundException, NotFoundIdentityNumberException {
        return authService.getUserRoles(userDetail.getUser().getUserNumber());
    }




    @PostMapping("/reset-password")
    public ServiceResponse resetRequestPassword(@RequestBody @Valid IdentityRequest identityRequest)
            throws CustomerNotFoundException, EmailNotFoundException, IdentityNotFoundException {
        return resetPasswordService.initiatePasswordReset(identityRequest);
    }

    @GetMapping("/reset-password")
    public ServiceResponse verifyResetToken(@RequestParam("token") String token) throws ExpiredTokenException, UsedTokenException {
        return resetPasswordService.verifyResetToken(token);
    }

    @PutMapping("/reset-password")
    public ServiceResponse resetPassword(@RequestBody @Valid ResetPasswordRequest resetPasswordRequest)
            throws CustomerNotFoundException, ExpiredTokenException {
        return resetPasswordService.resetPassword(resetPasswordRequest);
    }

    @PostMapping("/activate")
    public ServiceResponse activateAccount(@RequestBody @Valid ActivateCodeRequest code) throws CustomerNotFoundException, InvalidTokenException, AddressCannotBeEmptyException, AccountAlreadyHasADebitCardException, NotAccountOwnerException, NotFoundCheckingAccountException, TokenNotActiveException, ExpiredTokenException, IncorrectCodeException, NotFoundIdentityNumberException, LoginFailedException, IncorrectPasswordException, UserNotActiveException {
        return resetPasswordService.activateAccount(code);
    }

    @PostMapping("/verify")
    public ServiceResponse verifyLogin(@RequestBody @Valid ActivateCodeRequest code) throws CustomerNotFoundException, InvalidTokenException, AddressCannotBeEmptyException, CustomerNotActiveException, IncorrectCodeException, LoginFailedException, IncorrectPasswordException {
        return resetPasswordService.verifyLogin(code);
    }
}


