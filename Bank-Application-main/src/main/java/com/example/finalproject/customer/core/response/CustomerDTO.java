package com.example.finalproject.customer.core.response;


import com.example.finalproject.checkingAccount.core.response.CheckingAccountDTO;
import com.example.finalproject.savingAccount.core.response.SavingAccountDTO;


import com.example.finalproject.customer.entity.enums.EducationLevel;
import com.example.finalproject.customer.entity.enums.JobType;
import com.example.finalproject.customer.entity.enums.Profession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerDTO {
    private String identityNumber;
    private String name;
    private String surname;
    private String telephone;
    private BigDecimal income;
    private String email;
    private String password;
    @Temporal(TemporalType.DATE)
    private Date birthDay;
    private LocalDate createdAt;
    private boolean isActive;
    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    private Profession profession;

    private List<CheckingAccountDTO> checkingAccount = new ArrayList<>();
    private List<SavingAccountDTO>savingAccount=new ArrayList<>();


}
