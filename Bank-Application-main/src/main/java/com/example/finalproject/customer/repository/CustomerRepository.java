package com.example.finalproject.customer.repository;


import com.example.finalproject.checkingAccount.entity.CheckingAccount;
import com.example.finalproject.debitCard.entity.DebitCard;
import com.example.finalproject.savingAccount.entity.SavingAccount;
import com.example.finalproject.creditCard.entity.CreditCard;

import com.example.finalproject.customer.core.exception.AgeLimitException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // ResetPasswordToken üzerinden createdAt bilgisi çekme
    LocalDateTime findResetPasswordToken_CreatedAtById(long customerId);

    // Müşterinin DebitCard bilgilerini getir
    List<DebitCard> findDebitCardsById(long customerId);

    // Müşterinin SavingAccount bilgilerini getir
    List<SavingAccount> findSavingAccountsById(long customerId);

    // Müşterinin CheckingAccount bilgilerini getir
    List<CheckingAccount> findCheckingAccountsById(long customerId);

    // Müşterinin CreditCard bilgilerini getir
    List<CreditCard> findCreditCardsById(long customerId);

    // Belirli bir müşteri bilgisini kimlik numarası ile getir
    Optional<Customer> findByIdentityNumberIgnoreCase(String identityNumber);

    // Telefon numarasına göre müşteri getir
    Optional<Customer> findByTelephone(String telephone);

    // Email'e göre müşteri getir
    Optional<Customer> findByEmail(String email);

    // Email veya telefon numarası ile müşteri getir
    Optional<Customer> findByEmailOrTelephone(String email, String telephone);

    // Müşteri e-posta adresini kontrol et (Unique validation için)
    boolean existsByEmail(String email);

    // Müşteri telefon numarasını kontrol et (Unique validation için)
    boolean existsByTelephone(String telephone);

    // Kimlik numarasına göre müşteri var mı kontrol et (Unique validation için)
    boolean existsByIdentityNumber(String identityNumber);

    // Doğum tarihine göre müşteri listesi getir
    List<Customer> findByBirthDayBefore(Date birthDate);

    // Doğum tarihine bağlı yaş kontrolü
    default boolean ageLimit(Date birthDate) throws AgeLimitException {
        if (!findByBirthDayBefore(birthDate).isEmpty()) {
            throw new AgeLimitException();
        }
        return true;
    }

    // İsim ve soyad ile arama (String ifadeyi aramak için)
    List<Customer> findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(String name, String surname);

    // İlgili kimlik numarasına sahip müşteri sayısını al
    long countByIdentityNumber(String identityNumber);

    // Müşteriyi e-posta ile getirme
    Customer getByEmail(String email);

    // Müşteri ID'si ile müşteri getir
    default Customer findByCustomerId(long customerId) throws CustomerNotFoundException {
        return findById(customerId)
                .orElseThrow(CustomerNotFoundException::new);
    }
}
