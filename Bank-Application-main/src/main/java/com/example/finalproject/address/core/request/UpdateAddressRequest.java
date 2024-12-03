package com.example.finalproject.address.core.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAddressRequest {

    @NotBlank
    @Size(min = 3, max = 50)
    private String addressTitle; // Adres başlığı (Örn: Ev Adresi, İş Yeri Adresi)

    @NotBlank
    @Size(min = 3, max = 15)
    private String country; // Ülke adı

    @NotBlank
    @Size(min = 3, max = 15)
    private String city; // Şehir adı

    @NotBlank
    @Size(min = 3, max = 15)
    private String district; // İlçe adı

    @NotBlank
    @Size(min = 3, max = 50)
    private String streetNumber; // Sokak ve bina numarası (Örn: "Barış Mah., 20. Sokak No:5")

    @Size(max = 200)
    private String description; // Adres açıklaması veya önemli notlar (Opsiyonel)
}
