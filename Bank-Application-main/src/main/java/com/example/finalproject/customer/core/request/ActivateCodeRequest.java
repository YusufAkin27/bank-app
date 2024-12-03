package com.example.finalproject.customer.core.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivateCodeRequest {
    @Size(min = 6,max = 6,message = "6 hane girmelisiniz")
    private String code;

}
