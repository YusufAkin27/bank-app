package com.example.finalproject.checkingAccount.controller;


import com.example.finalproject.savingAccount.core.request.CreateCheckingAccountRequest;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.creditCard.entity.base.Activity;
import com.example.finalproject.checkingAccount.business.abstracts.CheckingAccountService;
import com.example.finalproject.checkingAccount.core.exceptions.AddressCannotBeEmptyException;
import com.example.finalproject.checkingAccount.core.exceptions.NotCustomerOwnerException;
import com.example.finalproject.checkingAccount.core.exceptions.NotFoundCheckingAccountException;
import com.example.finalproject.checkingAccount.core.exceptions.SendingMissingDataException;
import com.example.finalproject.checkingAccount.core.response.CheckingAccountDTO;
import com.example.finalproject.common.security.user.CustomUserDetail;
import com.example.finalproject.customer.core.exception.CustomerNotActiveException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.response.ServiceResponse;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/accounts/checkingAccounts")
@RequiredArgsConstructor
public class CheckingAccountController {

    private final CheckingAccountService checkingAccountService;

    @PostMapping("/add")
    public ServiceResponse add(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                               @RequestBody CreateCheckingAccountRequest createCheckingAccountRequest) throws CustomerNotFoundException,
            AddressCannotBeEmptyException, SendingMissingDataException {

        return checkingAccountService.add(userDetail.getUser().getId(),createCheckingAccountRequest);
    }


    @DeleteMapping("/delete/{checkingAccountId}")
    public ServiceResponse delete(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                  @PathVariable("checkingAccountId") long
                                          checkingAccountId) throws NotFoundCheckingAccountException, CustomerNotActiveException, CustomerNotFoundException,
            NotCustomerOwnerException, SendingMissingDataException {
        return checkingAccountService.delete(userDetail.getUser().getId(), checkingAccountId);
    }

    @GetMapping("/getAll")
    public List<CheckingAccountDTO> getAll(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        return checkingAccountService.getAllWithPagination(page, pageSize);
    }



    @GetMapping("/activate")
    public List<Activity> activate(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                   @RequestParam(defaultValue = "1") int page,
                                   @RequestParam(defaultValue = "10") int pageSize,
                                   @RequestParam long checkingAccountId) throws NotAccountOwnerException, CustomerNotFoundException {
        return checkingAccountService.activateWithPagination(userDetail.getUser().getId(),checkingAccountId, page, pageSize);
    }



}