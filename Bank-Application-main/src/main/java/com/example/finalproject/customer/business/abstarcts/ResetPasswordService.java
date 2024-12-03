package com.example.finalproject.customer.business.abstarcts;

import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.debitCard.core.exceptions.AccountAlreadyHasADebitCardException;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.core.request.ActivateCodeRequest;
import com.example.finalproject.customer.core.request.IdentityRequest;
import com.example.finalproject.customer.core.request.ResetPasswordRequest;

import com.example.finalproject.response.ServiceResponse;
import com.example.finalproject.verificationCode.*;
import com.example.finalproject.verificationCode.ExpiredTokenException;

public interface ResetPasswordService {
    ServiceResponse initiatePasswordReset(IdentityRequest identityRequest) throws EmailNotFoundException, IdentityNotFoundException;

    ServiceResponse verifyResetToken(String token) throws ExpiredTokenException, UsedTokenException;

    ServiceResponse resetPassword( ResetPasswordRequest resetPasswordRequest) throws ExpiredTokenException;

    ServiceResponse activateAccount(ActivateCodeRequest code) throws CustomerNotFoundException, InvalidTokenException, AddressCannotBeEmptyException, AccountAlreadyHasADebitCardException, NotAccountOwnerException, NotFoundCheckingAccountException, TokenNotActiveException, ExpiredTokenException, IncorrectCodeException, IncorrectPasswordException, LoginFailedException;

    ServiceResponse verifyLogin(ActivateCodeRequest code) throws InvalidTokenException, CustomerNotFoundException, CustomerNotActiveException, IncorrectCodeException, IncorrectPasswordException, LoginFailedException;
}
