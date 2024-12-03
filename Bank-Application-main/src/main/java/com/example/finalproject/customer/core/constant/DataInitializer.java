/*package com.example.finalproject.customer.core.constant;

import com.example.finalproject.account.entity.CheckingAccount;
import com.example.finalproject.account.entity.enums.AccountType;
import com.example.finalproject.account.repository.CheckingAccountRepository;
import com.example.finalproject.card.entity.DebitCard;
import com.example.finalproject.card.repository.DebitCardRepository;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final CheckingAccountRepository checkingAccountRepository;
    private final DebitCardRepository debitCardRepository;

    @Override
    public void run(String... args) throws Exception {
        String identityNumber = "12345678998";
        Optional<Customer> existingCustomer = customerRepository.findByIdentityNumber(identityNumber);

        if (existingCustomer.isEmpty()) {
            Customer newCustomer = Customer.builder()
                    .identityNumber(identityNumber)
                    .name("Yusuf")
                    .surname("Akin")
                    .telephone("+905555555555")
                    .income(new BigDecimal("5000"))
                    .email("yusuf.akin@example.com")
                    .birthDay(new Date())
                    .createdAt(LocalDate.now())
                    .isActive(true)
                    .build();

            customerRepository.save(newCustomer);

            // Demo Checking Account oluştur
            createCheckingAccountForCustomer(newCustomer);

            System.out.println("Müşteri ve demo checking account başarıyla oluşturuldu.");
        } else {
            System.out.println("Müşteri zaten mevcut.");
        }
    }

    private void createCheckingAccountForCustomer(Customer customer) {

        if (customer.getCheckingAccounts() == null) {
            customer.setCheckingAccounts(new ArrayList<>()); // Listeyi başlat
        }
        Random random = new Random();
        StringBuilder accountNo = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            int rakam = random.nextInt(10);
            accountNo.append(rakam);
        }

        String bankCode = "1234";
        String ibanNo = "TR" + bankCode + accountNo;

        CheckingAccount checkingAccount = new CheckingAccount();
        checkingAccount.setAccountNumber(accountNo.toString());
        checkingAccount.setIban(ibanNo);
        checkingAccount.setAccountHolderName(customer.getName() + " " + customer.getSurname());
        checkingAccount.setBalance(new BigDecimal(99999999));
        checkingAccount.setAccountType(AccountType.CHECKING);
        checkingAccount.setCreatedAt(LocalDate.now());
        checkingAccount.setActive(true);
        checkingAccount.setCustomer(customer);
        checkingAccount.setBankCode(bankCode);
        checkingAccount.setBranchCode("5678");
        checkingAccount.setBranchName("Merkez Şube");

        customer.getCheckingAccounts().add(checkingAccount);
        checkingAccount.setCustomer(customer);
        checkingAccountRepository.save(checkingAccount);
        createAndBindDebitCard(checkingAccount);
        System.out.println("Checking account başarıyla oluşturuldu: " + checkingAccount.getAccountNumber());
    }
    private void createAndBindDebitCard(CheckingAccount checkingAccount) {
        Set<String> cardNumbers = new HashSet<>();
        Set<String> ibans = new HashSet<>();

        DebitCard debitCard;
        do {
            debitCard = createDebitCardForAccount(checkingAccount);
        } while (!cardNumbers.add(debitCard.getCardNumber()) || !ibans.add(debitCard.getIban()));

        debitCard.setCheckingAccount(checkingAccount);
        checkingAccount.setDebitCard(debitCard);

        debitCard.setCustomer(checkingAccount.getCustomer());
        debitCardRepository.save(debitCard);

        System.out.println("Debit card başarıyla oluşturuldu ve Checking Account ile eşleştirildi: " + debitCard.getCardNumber());
    }

    private DebitCard createDebitCardForAccount(CheckingAccount checkingAccount) {
        String cvvNumber = "";
        String cardNumber = generateCardNumber();

        for (int i = 0; i < 3; i++) {
            int randomDigit = generateRandomDigit();
            cvvNumber += randomDigit;
        }

        LocalDate now = LocalDate.now();
        LocalDate future = now.plusYears(5);
        LocalDate expiryDate = future.withDayOfMonth(1);

        DebitCard debitCard = new DebitCard();
        debitCard.setCardNumber(cardNumber);
        debitCard.setNameAndSurname(checkingAccount.getAccountHolderName());
        debitCard.setIban(checkingAccount.getIban());
        debitCard.setExpiryDate(expiryDate);
        debitCard.setCvv(cvvNumber);
        debitCard.setPassword("1234"); // Varsayılan şifre
        debitCard.setActive(true);
        debitCard.setBalance(checkingAccount.getBalance());
        debitCard.setLockedBalance(checkingAccount.getLockedBalance());

        return debitCard;
    }

    private String generateCardNumber() {
        StringBuilder cardNumber = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                int randomDigit = random.nextInt(10);
                cardNumber.append(randomDigit);
            }
            if (i < 3) {
                cardNumber.append(" "); // 4 haneli gruplar arasında boşluk bırakır
            }
        }

        return cardNumber.toString();
    }

    private int generateRandomDigit() {
        Random random = new Random();
        return random.nextInt(10);
    }



}

 */
