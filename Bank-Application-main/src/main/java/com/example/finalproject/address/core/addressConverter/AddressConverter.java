package com.example.finalproject.address.core.addressConverter;


import com.example.finalproject.address.core.request.CreateAddressRequest;
import com.example.finalproject.address.core.response.AddressDTO;
import com.example.finalproject.address.entity.Address;

public interface AddressConverter {
    AddressDTO toAddressDTO(Address address);
    Address toAddressEntity(CreateAddressRequest addressRequest);
}
