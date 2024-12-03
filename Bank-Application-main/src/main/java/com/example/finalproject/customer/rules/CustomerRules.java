package com.example.finalproject.customer.rules;

import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.customer.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerRules {

    private final CustomerRepository customerRepository;


    public void findByTelephone(String telephone) throws CustomerByTelephoneNotUniqueException {
        if (customerRepository.existsByTelephone(telephone)) {
            throw new CustomerByTelephoneNotUniqueException();
        }
    }

    // Validates if the email is unique
    public void findByEmail(String email) throws CustomerByEmailNotUniqueException {
        if (customerRepository.existsByEmail(email)) {
            throw new CustomerByEmailNotUniqueException();
        }
    }

    // Checks if the user meets the age limit
    public void ageLimit(Date birthday) throws AgeLimitException {
        int age = calculateAge(birthday);
        if (age < 18) { // Example age limit is 18
            throw new AgeLimitException();
        }
    }

    private int calculateAge(Date birthday) {
        Calendar birthDate = Calendar.getInstance();
        birthDate.setTime(birthday);
        Calendar today = Calendar.getInstance();
        int age = today.get(Calendar.YEAR) - birthDate.get(Calendar.YEAR);
        if (today.get(Calendar.DAY_OF_YEAR) < birthDate.get(Calendar.DAY_OF_YEAR)) {
            age--;
        }
        return age;
    }

    // Validates if the email is unique and throws an exception if not
    public void isUniqueEmail(String email) throws CustomerByEmailNotUniqueException {
        Customer customer = customerRepository.getByEmail(email);
        if (customer != null && customer.isActive()) {
            throw new CustomerByEmailNotUniqueException();
        }
    }

    // Validates if the telephone number is unique and throws an exception if not
    public void isUniqueTelephoneNumber(String telephone) throws CustomerByTelephoneNotUniqueException {
        Optional<Customer> customer = customerRepository.findByTelephone(telephone);

        if (customer.isPresent() && customer.get().isActive()) {
            throw new CustomerByTelephoneNotUniqueException();
        }

    }

    // Validates if the identity number is unique and throws an exception if not
    public void isUniqueIdentityNumber(String identityNumber) throws CustomerByIdentityNumberNotUniqueException {
        Optional<Customer> customer = customerRepository.findByIdentityNumberIgnoreCase(identityNumber);
        if (customer.isPresent() && customer.get().isActive()) {
            throw new CustomerByIdentityNumberNotUniqueException();
        }
    }


    public void checkingEmail(String email) {
        return;
    }

    public void telephoneNumberValidate(String telephone) {
    }
}
