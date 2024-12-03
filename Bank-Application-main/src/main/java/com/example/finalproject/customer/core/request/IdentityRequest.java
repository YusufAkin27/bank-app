package com.example.finalproject.customer.core.request;

import com.example.finalproject.validation.CheckEmail;
import com.example.finalproject.validation.CheckIdentity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IdentityRequest {

    @NotBlank
    private String identity; // Kullanıcının e-posta adresi
}
