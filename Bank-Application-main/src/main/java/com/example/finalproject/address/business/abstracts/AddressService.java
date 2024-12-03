package com.example.finalproject.address.business.abstracts;

import com.example.finalproject.address.core.exception.DuplicateAddressTitleException;
import com.example.finalproject.address.core.response.AddressDTO;
import com.example.finalproject.address.entity.Address;
import com.example.finalproject.address.core.request.CreateAddressRequest;
import com.example.finalproject.address.core.request.UpdateAddressRequest;
import com.example.finalproject.customer.core.exception.AddressNotFoundException;
import com.example.finalproject.customer.core.exception.CustomerAddressInfoException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;

import com.example.finalproject.response.ServiceResponse;

import java.util.List;


public interface AddressService {
    ServiceResponse createAddress(long customerId, CreateAddressRequest createAddressRequest) throws CustomerNotFoundException, CustomerAddressInfoException, DuplicateAddressTitleException;

    ServiceResponse deleteAddress(long customerId, long addressId) throws CustomerNotFoundException, CustomerAddressInfoException, AddressNotFoundException;

    List<AddressDTO> getAddress(long customerId) throws CustomerNotFoundException, CustomerAddressInfoException, AddressNotFoundException;

    ServiceResponse updateAddress(long customerId, UpdateAddressRequest updateAddressRequest) throws CustomerNotFoundException, AddressNotFoundException;


}
