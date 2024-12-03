package com.example.finalproject.customer.core.request;

import com.example.finalproject.customer.entity.enums.EducationLevel;
import com.example.finalproject.customer.entity.enums.JobType;
import com.example.finalproject.customer.entity.enums.Profession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateCustomerProfileRequest {
    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private Profession profession;
}
