package com.example.finalproject;

import com.example.finalproject.address.business.abstracts.AddressService;
import com.example.finalproject.address.controller.AddressController;
import com.example.finalproject.customer.core.exception.AddressNotFoundException;
import com.example.finalproject.customer.core.exception.CustomerAddressInfoException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.address.core.request.CreateAddressRequest;
import com.example.finalproject.address.core.request.UpdateAddressRequest;
import com.example.finalproject.address.entity.Address;
import com.example.finalproject.response.ServiceResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AddressControllerTest {

    private AddressController addressController;
    private AddressService addressService;

    @BeforeEach
    public void setUp() {
        addressService = mock(AddressService.class);
        addressController = new AddressController(addressService);
    }




}
