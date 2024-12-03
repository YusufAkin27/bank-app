package com.example.finalproject.address.core.addressConverter;

import com.example.finalproject.address.core.request.CreateAddressRequest;

import com.example.finalproject.address.core.response.AddressDTO;
import com.example.finalproject.address.entity.Address;
import org.springframework.stereotype.Service;

@Service
public class AddressConverterImpl implements AddressConverter {

    @Override
    public AddressDTO toAddressDTO(Address address) {
        if (address == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }

        return AddressDTO.builder()
                .id(address.getId())                      // Adresin benzersiz kimliği
                .addressTitle(address.getAddressTitle())  // Adres başlığı (Ev, İş, vb.)
                .country(address.getCountry())            // Ülke adı
                .city(address.getCity())                  // Şehir adı
                .district(address.getDistrict())          // İlçe adı
                .streetNumber(address.getStreetNumber())  // Sokak ve bina numarası
                .description(address.getDescription())    // Adres açıklaması veya ek bilgiler
                .build();
    }

    public Address toAddressEntity(CreateAddressRequest request) {

        return Address.builder()
                .addressTitle(request.getAddressTitle())   // Adres başlığı
                .country(request.getCountry())             // Ülke
                .city(request.getCity())                   // Şehir
                .district(request.getDistrict())           // İlçe
                .streetNumber(request.getStreetNumber())   // Sokak ve bina numarası
                .description(request.getDescription())     // Adres açıklaması
                .build();
    }
}
