package com.example.finalproject.address.entity;

import com.example.finalproject.customer.entity.Customer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String addressTitle; // Adresin başlığı (Örn: "Ev Adresi", "İş Yeri Adresi")

    @NotBlank
    @Size(min = 3, max = 15)
    private String country; // Ülke bilgisi

    @NotBlank
    @Size(min = 3, max = 15)
    private String city; // Şehir bilgisi

    @NotBlank
    @Size(min = 3, max = 15)
    private String district; // İlçe bilgisi

    @NotBlank
    @Size(min = 3, max = 50)
    private String streetNumber; // Sokak adı ve numarası (Örn: "Barış Mahallesi, 20. Sokak No:15")

    @Size(max = 200)
    private String description; // Adres açıklaması veya ek bilgiler (Örn: "Apartman giriş kodu: 1234, 5. kat, daire no: 16")

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonBackReference
    private Customer customer; // Bu adresin ait olduğu müşteri
}
