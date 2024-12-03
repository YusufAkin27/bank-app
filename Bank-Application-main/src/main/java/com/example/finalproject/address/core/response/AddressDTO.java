package com.example.finalproject.address.core.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {
    private long id;
    private String addressTitle; // Adresin başlığı (Örn: Ev, İş)
    private String country;      // Ülke
    private String city;         // Şehir
    private String district;     // İlçe
    private String streetNumber; // Sokak adı ve numarası
    private String description;  // Adres açıklaması veya ek bilgiler
}
