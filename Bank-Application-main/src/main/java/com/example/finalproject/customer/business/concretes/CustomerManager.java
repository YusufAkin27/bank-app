package com.example.finalproject.customer.business.concretes;


import com.example.finalproject.customer.business.abstarcts.CustomerService;
import com.example.finalproject.customer.business.abstarcts.RoleService;
import com.example.finalproject.customer.core.exception.CustomerAlreadyActiveException;
import com.example.finalproject.customer.core.constant.CustomerConstant;
import com.example.finalproject.customer.core.converter.CustomerConverter;
import com.example.finalproject.customer.core.exception.*;

import com.example.finalproject.customer.core.request.CreateCustomerRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerProfileRequest;
import com.example.finalproject.customer.core.request.UpdateCustomerRequest;
import com.example.finalproject.customer.core.response.CustomerDTO;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.customer.entity.Role;
import com.example.finalproject.customer.repository.CustomerRepository;
import com.example.finalproject.customer.rules.CustomerRules;
import com.example.finalproject.response.DataServiceResponse;
import com.example.finalproject.response.ServiceResponse;

import com.example.finalproject.sms.SmsService;
import com.example.finalproject.verificationCode.ActivationCodeStillValidException;
import com.example.finalproject.verificationCode.VerificationCode;
import com.example.finalproject.verificationCode.VerificationCodeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerManager implements CustomerService {

    private final CustomerRepository customerRepository;

    private final CustomerConverter customerConverter;

    private final CustomerRules customerRules;

    private final VerificationCodeRepository verificationCodeRepository;

    private final SmsService smsService;

    private final RoleService roleService;


    @Override
    @Transactional
    public ServiceResponse signup(CreateCustomerRequest createCustomerRequest)
            throws CustomerAlreadyActiveException, ActivationCodeStillValidException, AgeLimitException,
            CustomerByEmailNotUniqueException, CustomerByTelephoneNotUniqueException,
            CustomerByIdentityNumberNotUniqueException {

        // 1. Yaş limiti kontrolü   
        customerRules.ageLimit(createCustomerRequest.getBirthDay());

        // 2. Uniqlik kontrolleri
        customerRules.isUniqueEmail(createCustomerRequest.getEmail());
        customerRules.isUniqueTelephoneNumber(createCustomerRequest.getTelephone());
        customerRules.isUniqueIdentityNumber(createCustomerRequest.getIdentityNumber());

        // 3. Kullanıcının mevcut olup olmadığını kontrol et
        Optional<Customer> existingCustomer = customerRepository.findByTelephone(
                createCustomerRequest.getTelephone()
        );

        if (existingCustomer.isPresent()) {
            Customer customer = existingCustomer.get();

            // 3.1 Kullanıcı aktifse hata fırlat
            if (customer.isActive()) {
                throw new CustomerAlreadyActiveException();
            }

            // 3.2 Mevcut bir aktivasyon kodu varsa ve hala geçerliyse hata fırlat
            VerificationCode lastCode = customer.getActivationCode();
            if (lastCode != null && !lastCode.isExpired()) {
                // Şu anki zaman
                Instant now = Instant.now();
                // Kodun son kullanma zamanı
                Instant expirationTime = Instant.from(lastCode.getExpiresAt()); // lastCode'da expirationTime olduğunu varsayıyoruz

                // Kalan süreyi hesapla (saniye cinsinden)
                long remainingTimeInSeconds = Duration.between(now, expirationTime).getSeconds();

                // Eğer süre hala geçerli ise, istisna fırlat
                throw new ActivationCodeStillValidException(remainingTimeInSeconds);
            }

            // 3.3 Eğer kullanıcı aktif değilse, SMS gönder ve işlemden çık
            sendSms(customer);
            return new ServiceResponse(
                    "Kullanıcı zaten kayıtlı ancak hesabı henüz aktif edilmemiştir. Yeni bir aktivasyon kodu gönderilmiştir.",
                    true
            );
        }

        // 4. Yeni müşteri oluştur
        Customer customer = customerConverter.createToCustomer(createCustomerRequest);
        customer.setPassword(createCustomerRequest.getPassword());

        // 4.1 Varsayılan kullanıcı rolünü ata
        Role roleUser = roleService.getRoleByName(CustomerConstant.ROLE_USER);
        customer.setRoles(Set.of(roleUser));

        // 4.2 Yeni müşteriyi veritabanına kaydet
        customerRepository.save(customer);

        // 5. Aktivasyon SMS'i gönder
        sendSms(customer);

        // 6. Başarılı dönüş yap
        return new ServiceResponse(
                "Müşteri kaydınız başarılı bir şekilde tamamlanmıştır. Aktivasyon kodunuz tarafınıza gönderilmiştir.",
                true
        );
    }


    public String randomCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(100000, 999999));
    }

    public boolean sendSms(Customer customer) {

        String activationCodeValue = randomCode();
        VerificationCode activationToken = VerificationCode.builder()
                .token(activationCodeValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(3))
                .isActive(true)
                .isVerified(false)
                .customer(customer)
                .build();

        String body = String.format(
                "Sayın %s,\n\n" +
                        "AkinBank ailesine katıldığınız için teşekkür ederiz. Sizi aramızda görmekten büyük mutluluk duymaktayız.\n\n" +
                        "Hesabınızı hemen aktif hale getirebilmeniz için aşağıda yer alan doğrulama kodunu kullanabilirsiniz:\n\n" +
                        "**%s**\n\n" +
                        "Bu kod 3 dakika boyunca geçerli olacaktır. Eğer doğrulama sırasında herhangi bir sorun yaşarsanız veya bu mesajı talep etmediyseniz, lütfen müşteri hizmetlerimizle iletişime geçmekten çekinmeyiniz.\n\n" +
                        "Güveniniz için teşekkür eder, size keyifli bir deneyim dileriz.\n\n" +
                        "Saygılarımızla,\n" +
                        "AkinBank Ekibi",
                customer.getName(), activationToken.getToken());

        System.out.println(activationCodeValue);
        customer.setActivationCode(activationToken);

        verificationCodeRepository.save(activationToken);
        return smsService.sendSms(customer.getTelephone(), body);
    }



    @Override
    @Transactional
    public ServiceResponse deleteCustomer(long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findByCustomerId(customerId);
        customer.setActive(false);
        return new ServiceResponse("Müşteri ID: " + customerId + " olan kayıt başarıyla silinmiştir.", true);
    }


    @Override
    @Transactional
    public ServiceResponse updateCustomer(long id, UpdateCustomerRequest updateCustomerRequest) throws CustomerNotFoundException,
            CustomerByEmailNotUniqueException,
            CustomerByTelephoneNotUniqueException, Is10TelephoneException {
        Customer customer = customerRepository.findByCustomerId(id);


        if (updateCustomerRequest.getEmail() != null) {
            customerRules.findByEmail(updateCustomerRequest.getEmail());
            customerRules.checkingEmail(updateCustomerRequest.getEmail());
        }
        if (updateCustomerRequest.getTelephone() != null) {
            customerRules.findByTelephone(updateCustomerRequest.getTelephone());
            customerRules.telephoneNumberValidate(updateCustomerRequest.getTelephone());
        }
        checkingCustomer(updateCustomerRequest, customer);
        return new ServiceResponse("Güncelleme işlemi başarıyla tamamlanmıştır.", true);


    }


    @Override
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDTO> customerList = customers.stream()
                .filter(Customer::isActive)
                .map(customerConverter::customerDTOConverter)
                .collect(Collectors.toList());
        return customerList;
    }

    @Override
    public ServiceResponse getCustomerById(long customerId) {
        return new DataServiceResponse<>("profil bilgileri",true,customerConverter.customerDTOConverter(customerRepository.findById(customerId).get()));
    }




    @Override
    public Optional<Customer> getCustomerByIdentityNumber(String identityNumber) throws CustomerNotFoundException {
        return customerRepository.findByIdentityNumberIgnoreCase(identityNumber);
    }

    @Override
    public CustomerDTO getProfile(long id) throws CustomerNotFoundException {
        Customer customer = customerRepository.findByCustomerId(id);
        return customerConverter.customerDTOConverter(customer);

    }

    @Override
    @Transactional
    public ServiceResponse editProfile(long id, UpdateCustomerProfileRequest updateCustomerProfileRequest) throws CustomerNotFoundException {
        Customer customer = customerRepository.findByCustomerId(id);
        customer.setEducationLevel(updateCustomerProfileRequest.getEducationLevel());
        customer.setJobType(updateCustomerProfileRequest.getJobType());
        customer.setProfession(updateCustomerProfileRequest.getProfession());
        return new ServiceResponse("Bilgiler güncellendi", true);
    }


    public Customer checkingCustomer(UpdateCustomerRequest updateCustomerRequest, Customer customer) {

        if (updateCustomerRequest.getTelephone() != null) {
            customer.setTelephone(updateCustomerRequest.getTelephone());
        }

        if (updateCustomerRequest.getIncome() != null) {
            customer.setIncome(updateCustomerRequest.getIncome());
        }

        if (updateCustomerRequest.getEmail() != null) {
            customer.setEmail(updateCustomerRequest.getEmail());
        }


        return customer;

    }

}





