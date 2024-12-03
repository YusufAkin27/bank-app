package com.example.finalproject.customer.controller;


import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.debitCard.core.exceptions.AccountAlreadyHasADebitCardException;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.common.security.user.CustomUserDetail;
import com.example.finalproject.customer.business.abstarcts.CustomerService;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.core.request.CreateCustomerRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerProfileRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerRequest;
import com.example.finalproject.customer.core.response.CustomerDTO;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.response.ServiceResponse;
import com.example.finalproject.verificationCode.ActivationCodeStillValidException;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bank/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/sign-up")
    public ServiceResponse create(@RequestBody @Valid CreateCustomerRequest createCustomerRequest)
            throws CustomerByEmailNotUniqueException, AgeLimitException, CustomerByTelephoneNotUniqueException,
            CustomerByIdentityNumberNotUniqueException, Is10TelephoneException, CheckingEmailException,
            Is11IdentityNumberException, CustomerAlreadyActiveException, ActivationCodeStillValidException, AddressCannotBeEmptyException, AccountAlreadyHasADebitCardException, NotAccountOwnerException, CustomerNotFoundException, NotFoundCheckingAccountException {
        return customerService.signup(createCustomerRequest);
    }




    @DeleteMapping(path = "/delete")
    public ServiceResponse delete(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail)
            throws BusinessException {
        return customerService.deleteCustomer(userDetail.getUser().getId());

    }


    @PatchMapping(path = "/update")
    public ServiceResponse update(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                  @RequestBody UpdateCustomerRequest updateCustomerRequest) throws
            CustomerNotFoundException, CustomerByEmailNotUniqueException, AgeLimitException,
            CustomerByTelephoneNotUniqueException, CustomerByIdentityNumberNotUniqueException,
            Is10TelephoneException, CheckingEmailException, Is11IdentityNumberException {
        return customerService.updateCustomer(userDetail.getUser().getId(), updateCustomerRequest);
    }

    @GetMapping("/all")
    public List<CustomerDTO> getAllCustomers() throws CustomerNotFoundException {
        return customerService.getAllCustomers();
    }

    @PutMapping("/edit-profile")
    public ServiceResponse editprofile(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail, UpdateCustomerProfileRequest updateCustomerProfileRequest) throws CustomerNotFoundException {
        return customerService.editProfile(userDetail.getUser().getId(), updateCustomerProfileRequest);
    }

    @GetMapping("/getProfile")
    public ServiceResponse getCustomerById(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail) throws CustomerNotFoundException {
        return customerService.getCustomerById(userDetail.getUser().getId());
    }


    @GetMapping("/getByIdentityNumber")
    public Optional<Customer> getCustomerByIdentityNumber(@RequestParam(name = "identityNumber") String identityNumber)
            throws CustomerNotFoundException {
        return customerService.getCustomerByIdentityNumber(identityNumber);
    }


}
