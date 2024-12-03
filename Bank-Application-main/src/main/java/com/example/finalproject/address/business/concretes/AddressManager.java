package com.example.finalproject.address.business.concretes;


import com.example.finalproject.address.core.addressConverter.AddressConverter;
import com.example.finalproject.address.core.exception.DuplicateAddressTitleException;
import com.example.finalproject.address.core.response.AddressDTO;
import com.example.finalproject.address.entity.Address;
import com.example.finalproject.address.repository.AddressRepository;
import com.example.finalproject.address.core.request.CreateAddressRequest;
import com.example.finalproject.address.core.request.UpdateAddressRequest;
import com.example.finalproject.address.business.abstracts.AddressService;

import com.example.finalproject.customer.core.exception.AddressNotFoundException;
import com.example.finalproject.customer.core.exception.CustomerAddressInfoException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;

import com.example.finalproject.customer.entity.Customer;

import com.example.finalproject.customer.repository.CustomerRepository;
import com.example.finalproject.response.ServiceResponse;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Scope("prototype")
public class AddressManager implements AddressService {

    private final AddressRepository addressRepository;

    private final CustomerRepository customerRepository;
    private final AddressConverter addressConverter;


    @Override
    @Transactional
    public ServiceResponse createAddress(long customerId, CreateAddressRequest createAddressRequest) throws CustomerNotFoundException, CustomerAddressInfoException, DuplicateAddressTitleException {
        // Müşteri kontrolü
        Customer customer = customerRepository.findByCustomerId(customerId);
        if (customer == null) {
            throw new CustomerNotFoundException();
        }

        // Aynı başlığa sahip adres kontrolü
        boolean isDuplicateTitle = customer.getAddresses().stream()
                .anyMatch(address -> address.getAddressTitle().equalsIgnoreCase(createAddressRequest.getAddressTitle()));

        if (isDuplicateTitle) throw new DuplicateAddressTitleException(createAddressRequest.getAddressTitle());

        // Yeni adresin oluşturulması ve kaydedilmesi
        Address address = addressConverter.toAddressEntity( createAddressRequest);
        address.setCustomer(customer);
        customer.getAddresses().add(address);
        addressRepository.save(address);

        return new ServiceResponse("Adres başarıyla kaydedildi.", true);
    }

    @Override
    @Transactional
    public ServiceResponse deleteAddress(long customerId, long addressId) throws CustomerNotFoundException, AddressNotFoundException {
        // Müşteri kontrolü
        Customer customer = customerRepository.findByCustomerId(customerId);


        // Adres kontrolü
        Address address = customer.getAddresses().stream()
                .filter(a -> a.getId() == addressId)
                .findFirst()
                .orElseThrow(AddressNotFoundException::new);

        // Adres silme işlemi
        addressRepository.delete(address);
        customer.getAddresses().remove(address);

        return new ServiceResponse("Adres başarıyla silindi.", true);
    }


    @Override
    public List<AddressDTO> getAddress(long customerId) throws CustomerNotFoundException, AddressNotFoundException {
        // Müşteri kontrolü
        Customer customer = customerRepository.findByCustomerId(customerId);
        if (customer == null) {
            throw new CustomerNotFoundException();
        }

        // Müşterinin adreslerini kontrol etme
       return customer.getAddresses().stream().map(addressConverter::toAddressDTO).collect(Collectors.toList());


    }

    @Override
    @Transactional
    public ServiceResponse updateAddress(long customerId, UpdateAddressRequest updateAddressRequest) throws CustomerNotFoundException, AddressNotFoundException {
        Address address = checkingAddressConverter(customerId, updateAddressRequest);

        if (address == null) {
            throw new AddressNotFoundException();
        }

        // Başarılı güncelleme mesajı
        return new ServiceResponse("Adres güncelleme başarılı.", true);
    }

    @Transactional
    public Address checkingAddressConverter(long customerId, UpdateAddressRequest updateAddressRequest) throws CustomerNotFoundException, AddressNotFoundException {
        // Müşteri kontrolü
        Customer customer = customerRepository.findByCustomerId(customerId);
        if (customer == null) {
            throw new CustomerNotFoundException();
        }

        // Müşterinin adreslerini kontrol etme
        Address address = customer.getAddresses().stream()
                .filter(a -> Objects.equals(a.getAddressTitle(), updateAddressRequest.getAddressTitle())) // Adres ID'sine göre filtreleme
                .findFirst()
                .orElseThrow(AddressNotFoundException::new);

        // Adres bilgilerini güncelleme
        if (updateAddressRequest.getAddressTitle() != null && !updateAddressRequest.getAddressTitle().isBlank()) {
            address.setAddressTitle(updateAddressRequest.getAddressTitle());
        }
        if (updateAddressRequest.getCity() != null && !updateAddressRequest.getCity().isBlank()) {
            address.setCity(updateAddressRequest.getCity());
        }
        if (updateAddressRequest.getCountry() != null && !updateAddressRequest.getCountry().isBlank()) {
            address.setCountry(updateAddressRequest.getCountry());
        }
        if (updateAddressRequest.getDistrict() != null && !updateAddressRequest.getDistrict().isBlank()) {
            address.setDistrict(updateAddressRequest.getDistrict());
        }
        if (updateAddressRequest.getStreetNumber() != null && !updateAddressRequest.getStreetNumber().isBlank()) {
            address.setStreetNumber(updateAddressRequest.getStreetNumber());
        }
        if (updateAddressRequest.getDescription() != null && !updateAddressRequest.getDescription().isBlank()) {
            address.setDescription(updateAddressRequest.getDescription());
        }

        // Güncellenmiş adresi döndür
        return address;
    }





}
