package com.example.finalproject.customer.business.abstarcts;

;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.response.ServiceResponse;

import javax.servlet.http.HttpServletResponse;

public interface AuthService {

    ServiceResponse login(String identityNumber, String password, String ipAddress)
            throws LoginFailedException, NotFoundIdentityNumberException, EmailNotFoundException,
            IncorrectPasswordException, UserNotActiveException;

    String getUserRoles(String identityNumber) throws EmailNotFoundException, NotFoundIdentityNumberException;

    ServiceResponse logout(long customerId, HttpServletResponse response);
}
