package com.example.finalproject.address.controller;

import com.example.finalproject.address.core.exception.DuplicateAddressTitleException;
import com.example.finalproject.address.core.response.AddressDTO;
import com.example.finalproject.address.entity.Address;
import com.example.finalproject.address.core.request.CreateAddressRequest;
import com.example.finalproject.address.core.request.UpdateAddressRequest;
import com.example.finalproject.address.business.abstracts.AddressService;
import com.example.finalproject.common.security.user.CustomUserDetail;
import com.example.finalproject.customer.core.exception.AddressNotFoundException;
import com.example.finalproject.customer.core.exception.CustomerAddressInfoException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;


import com.example.finalproject.response.ServiceResponse;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/add")
    public ServiceResponse add(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                               @RequestBody CreateAddressRequest createAddressRequest) throws CustomerNotFoundException,
            CustomerAddressInfoException, DuplicateAddressTitleException {
        return addressService.createAddress(userDetail.getUser().getId(),createAddressRequest);
    }

    @PutMapping("/update")
    public ServiceResponse update(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,
                                  @RequestBody UpdateAddressRequest updateAddressRequest) throws CustomerNotFoundException,
            AddressNotFoundException {
        return addressService.updateAddress(userDetail.getUser().getId(),updateAddressRequest);
    }

    @DeleteMapping("/delete")
    public ServiceResponse delete(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail,long addressId) throws CustomerNotFoundException,
            CustomerAddressInfoException, AddressNotFoundException {
        return addressService.deleteAddress(userDetail.getUser().getId(),addressId);
    }

    @GetMapping("/get")
    public List<AddressDTO> getAddress(@Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetail userDetail) throws CustomerAddressInfoException,
            CustomerNotFoundException, AddressNotFoundException {
        return addressService.getAddress(userDetail.getUser().getId());
    }

}
