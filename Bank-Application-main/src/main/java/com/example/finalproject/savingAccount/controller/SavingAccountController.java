package com.example.finalproject.savingAccount.controller;

import com.example.finalproject.savingAccount.business.abstracts.SavingAccountService;
import com.example.finalproject.savingAccount.core.exception.NotFoundSavingAccountException;
import com.example.finalproject.savingAccount.core.exception.isBaseSavingAccountException;
import com.example.finalproject.savingAccount.core.request.AddMoneySavingAccount;
import com.example.finalproject.savingAccount.core.request.CreateSavingAccountRequest;

import com.example.finalproject.savingAccount.core.response.SavingAccountDTO;
import com.example.finalproject.debitCard.core.exceptions.NotAccountOwnerException;
import com.example.finalproject.creditCard.entity.base.Activity;
import com.example.finalproject.common.security.user.CustomUserDetail;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.response.ServiceResponse;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/accounts/savingAccounts")
@RequiredArgsConstructor
public class SavingAccountController {

    private final SavingAccountService savingAccountService;

    @PostMapping("/add")
    public ServiceResponse add(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                               @RequestBody CreateSavingAccountRequest createSavingAccountRequest) throws CustomerNotFoundException, isBaseSavingAccountException, NotAccountOwnerException {
        return savingAccountService.add(userDetail.getUser().getId(), createSavingAccountRequest);
    }


    @DeleteMapping("/delete")
    public ServiceResponse delete(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                  @RequestParam(name = "savingAccountId") long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException {
        return savingAccountService.delete(userDetail.getUser().getId(), savingAccountId);
    }

    @GetMapping("/getActivities")
    public List<Activity> getActivities(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                        @RequestParam(name = "savingAccountId") long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException {
        return savingAccountService.getActivities(userDetail.getUser().getId(), savingAccountId);
    }

    @GetMapping("/getall")
    public List<SavingAccountDTO> getAll(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail) {
        return savingAccountService.getAll(userDetail.getUser().getId());
    }

    @PostMapping("/addmoney")
    public ServiceResponse addMoney(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                    @RequestBody AddMoneySavingAccount addMoneySavingAccount) throws NotFoundSavingAccountException, NotAccountOwnerException {
        return savingAccountService.addMoney(userDetail.getUser().getId(), addMoneySavingAccount);
    }

    @GetMapping("/doactive")
    public ServiceResponse doActive(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                    @RequestParam(name = "savingAccountId") long savingAccountId) throws NotFoundSavingAccountException, NotAccountOwnerException {
        return savingAccountService.doActive(userDetail.getUser().getId(), savingAccountId);
    }

}
