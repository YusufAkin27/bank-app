package com.example.finalproject.customer.business.abstarcts;

import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.debitCard.core.exceptions.AccountAlreadyHasADebitCardException;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.core.request.CreateCustomerRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerProfileRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerRequest;
import com.example.finalproject.customer.core.response.CustomerDTO;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.response.ServiceResponse;
import com.example.finalproject.verificationCode.ActivationCodeStillValidException;

import java.util.List;
import java.util.Optional;


public interface CustomerService {
    ServiceResponse signup(CreateCustomerRequest createCustomerRequest) throws CustomerByIdentityNumberNotUniqueException, CustomerByEmailNotUniqueException,
            CustomerByTelephoneNotUniqueException, AgeLimitException, Is10TelephoneException, Is11IdentityNumberException, CheckingEmailException, CustomerAlreadyActiveException, ActivationCodeStillValidException, AddressCannotBeEmptyException, CustomerNotFoundException, AccountAlreadyHasADebitCardException, NotAccountOwnerException, NotFoundCheckingAccountException;

    ServiceResponse deleteCustomer(long costumerId) throws BusinessException;

    ServiceResponse updateCustomer(long id, UpdateCustomerRequest updateCustomerRequest)
            throws CustomerNotFoundException, AgeLimitException, CustomerByIdentityNumberNotUniqueException,
            CustomerByEmailNotUniqueException, CustomerByTelephoneNotUniqueException, Is11IdentityNumberException,
            Is10TelephoneException, CheckingEmailException;

    List<CustomerDTO> getAllCustomers() throws CustomerNotFoundException;

    ServiceResponse getCustomerById( long customerId) throws CustomerNotFoundException;




    Optional<Customer> getCustomerByIdentityNumber( String identityNumber) throws CustomerNotFoundException;


    CustomerDTO getProfile(long id) throws CustomerNotFoundException;

    ServiceResponse editProfile(long id, UpdateCustomerProfileRequest updateCustomerProfileRequest) throws CustomerNotFoundException;

}
