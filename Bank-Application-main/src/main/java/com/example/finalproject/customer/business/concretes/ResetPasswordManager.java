package com.example.finalproject.customer.business.concretes;


import com.example.finalproject.common.entity.LoginHistory;
import com.example.finalproject.common.repository.LoginHistoryRepository;
import com.example.finalproject.common.security.jwt.impl.JWTHelper;
import com.example.finalproject.common.security.token.service.TokenService;
import com.example.finalproject.common.security.user.CustomUserDetail;
import com.example.finalproject.customer.business.abstarcts.ResetPasswordService;
import com.example.finalproject.customer.core.constant.Utils;
import com.example.finalproject.customer.core.exception.IdentityNotFoundException;
import com.example.finalproject.customer.core.exception.*;
import com.example.finalproject.customer.core.request.ActivateCodeRequest;
import com.example.finalproject.customer.core.request.IdentityRequest;
import com.example.finalproject.customer.core.request.ResetPasswordRequest;
import com.example.finalproject.customer.core.response.LoginResponse;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.customer.repository.CustomerRepository;
import com.example.finalproject.email.EmailMessage;
import com.example.finalproject.email.EmailService;


import com.example.finalproject.response.ServiceResponse;


import com.example.finalproject.verificationCode.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ResetPasswordManager implements ResetPasswordService {
    private final CustomerRepository customerRepository;
    private final JWTHelper jwtHelper;
    private final EmailService emailService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final LoginHistoryRepository loginHistoryRepository;
    private final TokenService tokenService;


    @Override
    @Transactional
    public ServiceResponse initiatePasswordReset(IdentityRequest identityRequest) throws IdentityNotFoundException {
        Customer customer = customerRepository.findByIdentityNumberIgnoreCase(identityRequest.getIdentity()).orElse(null);
        if (customer == null) {
            throw new IdentityNotFoundException();
        }

        return checkAndCreateToken(customer);

    }


    @Override
    public ServiceResponse verifyResetToken(String token) throws ExpiredTokenException, UsedTokenException {
        VerificationCode verificationCode = verificationCodeRepository.findByToken(token)
                .orElseThrow(ExpiredTokenException::new);

        // Token geçerlilik kontrolü
        if (verificationCode.isExpired() || !verificationCode.isActive()) {
            throw new ExpiredTokenException();
        }

        if (verificationCode.isVerified()) {// token kullanılmış ise
            throw new UsedTokenException();
        }
        // Token geçerli ve aktifse onaylıyoruz
        System.out.println("token doğrulandı");
        verificationCode.setVerified(true);
        verificationCodeRepository.save(verificationCode);

        return new ServiceResponse("Token doğrulama işlemi başarıyla tamamlanmıştır.", true);
    }


    private ServiceResponse checkAndCreateToken(Customer customer) {
        LocalDateTime now = LocalDateTime.now();

        // Reset token oluşturulma zamanını sorgula
        LocalDateTime createdAt = customerRepository.findResetPasswordToken_CreatedAtById(customer.getId());

        if (createdAt != null) {
            LocalDateTime expiryTime = createdAt.plusMinutes(3); // Token geçerlilik süresi 3 dakika

            if (expiryTime.isAfter(now)) {
                Duration duration = Duration.between(now, expiryTime);
                long minutes = duration.toMinutes();
                long seconds = duration.getSeconds() % 60;

                // Kullanıcıya kalan süreyi bildir
                String message = String.format(
                        "Son e-posta isteğinizin üzerinden henüz %d dakika %d saniye geçmedi. Lütfen daha sonra tekrar deneyin.",
                        minutes, seconds
                );
                return new ServiceResponse(message, false);
            }
        }

        // Yeni şifre sıfırlama token'ı oluştur
        String resetTokenValue = UUID.randomUUID().toString();
        VerificationCode resetToken = VerificationCode.builder()
                .token(resetTokenValue)
                .createdAt(now)
                .expiresAt(now.plusMinutes(15))
                .isActive(true)
                .isVerified(false)
                .customer(customer)
                .build();

        // Yeni token'ı kaydet
        customer.setResetPasswordToken(resetToken);
        verificationCodeRepository.save(resetToken);

        // Şifre sıfırlama bağlantısını oluşturma
        String resetLink = "http://localhost:3000/reset-password?token=" + resetTokenValue;
        System.out.println(resetLink);

        String subject = "Şifre Sıfırlama Talebi Alındı";
        String body = String.format(
                "Merhaba %s,\n\n" +
                        "Şifrenizi sıfırlamak için bir talep aldık. Aşağıdaki bağlantıya tıklayarak yeni bir şifre oluşturabilirsiniz:\n\n" +
                        "%s\n\n" +
                        "Bu bağlantı yalnızca 15 dakika boyunca geçerlidir. Lütfen hızlı bir şekilde bağlantıyı kullanın.\n\n" +
                        "Eğer bu talebi siz yapmadıysanız veya herhangi bir sorunla karşılaşırsanız, lütfen bizimle iletişime geçmekten çekinmeyin.\n\n" +
                        "Güvenliğiniz bizim için önemlidir.\n\n" +
                        "Saygılarımızla,\n" +
                        "AkinMarket Destek Ekibi: AkinMarket27@gmail.com",
                customer.getName(), resetLink
        );

        // E-posta mesajını oluştur
        EmailMessage emailMessage = new EmailMessage();
        emailMessage.setToEmail(customer.getEmail());
        emailMessage.setSubject(subject);
        emailMessage.setBody(body);

        // E-posta gönderimi kuyruğa ekle
        try {
            emailService.queueEmail(emailMessage); // E-postayı kuyruğa ekleyin
        } catch (Exception e) {
            verificationCodeRepository.delete(resetToken); // E-posta gönderiminde hata oluşursa token'ı sil
            return new ServiceResponse("E-posta gönderimi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.", false);
        }

        return new ServiceResponse("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.", true);
    }

    @Override
    @Transactional
    public ServiceResponse resetPassword(ResetPasswordRequest resetPasswordRequest) throws ExpiredTokenException {
        // Token üzerinden doğrulama kodunu ve kullanıcıyı bul
        VerificationCode resetToken = verificationCodeRepository.findByToken(resetPasswordRequest.getToken())
                .orElseThrow(ExpiredTokenException::new);

        // Kullanıcıyı kontrol et
        Customer customer = resetToken.getCustomer();

        // Token geçerlilik kontrolü
        if (resetToken.isExpired() || !resetToken.isActive()) {
            throw new ExpiredTokenException();
        }

        // Kullanıcı doğrulama kodunu onaylamamışsa hata mesajı döner
        if (!resetToken.isVerified()) {
            return new ServiceResponse("Şifre sıfırlama işlemi için lütfen doğrulama kodunu onaylayınız.", false);
        }

        // Token'i devre dışı bırak
        resetToken.setActive(false);
        resetToken.setVerified(false); // Token kullanıldığında onay durumu sıfırlanabilir
        verificationCodeRepository.save(resetToken); // Güncellenmiş token durumunu kaydet

        // Şifreyi güncelle
        if (customer != null) {
            customer.setHashPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
            customerRepository.save(customer);
            sendConfirmationEmail(customer.getEmail(), customer.getName());
        }

        return new ServiceResponse("Şifreniz başarıyla güncellenmiş olup, onay e-postası tarafınıza iletilmiştir.", true);
    }


    private void sendConfirmationEmail(String email, String name) {
        String subject = "Şifre Sıfırlama İşlemi Başarıyla Tamamlandı";
        String body = String.format(
                "Merhaba %s,\n\n" +
                        "Şifrenizi başarıyla sıfırladık. Yeni şifrenizle hesabınıza güvenli bir şekilde erişebilirsiniz.\n\n" +
                        "Eğer bu işlemi siz yapmadıysanız veya şifrenizde herhangi bir sorun varsa, lütfen bizimle iletişime geçin.\n\n" +
                        "Saygılarımızla,\n" +
                        "AkinBank Destek Ekibi: AkinMarket27@gmail.com",
                name
        );

        EmailMessage emailMessage = new EmailMessage();
        emailMessage.setToEmail(email);
        emailMessage.setSubject(subject);
        emailMessage.setBody(body);

        try {
            emailService.queueEmail(emailMessage); // E-postayı kuyruğa ekleyin
        } catch (Exception e) {
            // E-posta gönderimi sırasında hata oluşursa loglayın veya farklı bir işlem yapabilirsiniz.
        }
    }

    @Override
    @Transactional
    public ServiceResponse activateAccount(ActivateCodeRequest request)
            throws InvalidTokenException, TokenNotActiveException, ExpiredTokenException, IncorrectCodeException, IncorrectPasswordException, LoginFailedException {

        // 1. Token ile doğrulama kodunu veritabanında bul
        VerificationCode verificationCode = verificationCodeRepository.findByToken(request.getCode())
                .orElseThrow(InvalidTokenException::new);

        // 2. Kodun aktif olup olmadığını kontrol et
        if (!verificationCode.isActive()) {
            throw new TokenNotActiveException();
        }

        // 3. Kodun süresinin dolup dolmadığını kontrol et
        if (verificationCode.isExpired()) {
            throw new ExpiredTokenException();
        }

        // 5. Müşteri doğrulama kodundan alınır
        Customer customer = verificationCode.getCustomer();

        if (customer.getActivationCode().getCustomer().equals(request.getCode())) {
            throw new IncorrectCodeException();
        }
        // 6. Hesap zaten aktif mi kontrol et
        if (customer.isActive()) {
            return new ServiceResponse(
                    "Hesabınız zaten aktif durumda. Giriş yapmak için kullanıcı bilgilerinizi kullanabilirsiniz.",
                    false
            );
        }


        // 7. Hesabı aktif et ve doğrulama kodunu pasif yap
        customer.setActive(true);
        verificationCode.setVerified(true);
        verificationCode.setActive(false);


        // 8. Güncelleme işlemlerini kaydet
        customerRepository.save(customer);
        verificationCodeRepository.save(verificationCode);

        try {
            // Kullanıcıyı doğrula ve token oluştur
            String token = authenticateAndGenerateToken(customer);
            System.out.println(token);


            LoginResponse loginResponse = new LoginResponse(token);
            tokenService.deleteAllTokensExcept(token, customer);
            return new ServiceResponse(loginResponse.getToken(), true);

        } catch (AuthenticationException e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());

            // Başarısız olursa IP adresini giriş geçmişinden kaldır
            removeLoginHistory(customer);

            throw new IncorrectPasswordException();
        } catch (Exception e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());
            throw new LoginFailedException();
        }


    }


    @Override
    @Transactional
    public ServiceResponse verifyLogin(ActivateCodeRequest request)
            throws InvalidTokenException, CustomerNotFoundException, CustomerNotActiveException, IncorrectCodeException, IncorrectPasswordException, LoginFailedException {

        // Doğrulama kodunu veritabanında bul
        VerificationCode verificationCode = verificationCodeRepository.findByToken(request.getCode())
                .orElseThrow(InvalidTokenException::new);

        // Kodun aktif ve süresinin dolmamış olduğundan emin ol
        if (!verificationCode.isActive() || verificationCode.isExpired()) {
            throw new InvalidTokenException();
        }

        // Müşteriyi doğrulama kodundan al
        Customer customer = verificationCode.getCustomer();
        if (customer == null) {
            throw new CustomerNotFoundException();
        }

        // Hesabın aktif olduğunu kontrol et
        if (!customer.isActive()) {
            throw new CustomerNotActiveException();
        }

        // Kod doğruluğunu kontrol et
        if (!customer.getSessionConfirmationCode().getToken().equals(request.getCode())) {
            throw new IncorrectCodeException();
        }

        // Kullanıcının son giriş IP adresini al
        Optional<LoginHistory> lastLoginHistoryOpt = loginHistoryRepository.findTopByUserOrderByLoginTimeDesc(customer);
        if (lastLoginHistoryOpt.isEmpty()) {
            throw new LoginFailedException();
        }

        // Kod doğrulaması başarılıysa işlemleri devam ettir
        verificationCode.setActive(false);
        verificationCode.setVerified(true);
        verificationCodeRepository.save(verificationCode);

        System.out.println(customer.getIdentityNumber() + "  " + customer.getHashPassword());

        try {
            // Kullanıcıyı doğrula ve token oluştur
            String token = authenticateAndGenerateToken(customer);
            System.out.println(token);


            LoginResponse loginResponse = new LoginResponse(token);
            tokenService.deleteAllTokensExcept(token, customer);
            return new ServiceResponse(loginResponse.getToken(), true);

        } catch (AuthenticationException e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());

            // Başarısız olursa IP adresini giriş geçmişinden kaldır
            removeLoginHistory(customer);

            throw new IncorrectPasswordException();
        } catch (Exception e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());
            throw new LoginFailedException();
        }
    }


    private String authenticateAndGenerateToken(Customer customer) throws AuthenticationException, CustomerNotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(customer.getIdentityNumber(), customer.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
        List<String> roles = Utils.SimpleGrantedAuthorityToListString((Collection<GrantedAuthority>) customUserDetail.getAuthorities());

        // JWT token oluştur
        String token = jwtHelper.generate(customer.getIdentityNumber(), roles);
        customUserDetail.setToken(token);

        // Eski token'ları sil
        tokenService.deleteAllTokensExcept(token, customer);

        return token;
    }


    public void removeLoginHistory(Customer customer) {
        // Kullanıcının son giriş IP adresini al
        Optional<LoginHistory> lastLoginHistoryOpt = loginHistoryRepository.findTopByUserOrderByLoginTimeDesc(customer);

        // Eğer son giriş kaydı varsa ve giriş yapılan IP adresi belirtilen IP adresi ile eşleşiyorsa, sil
        if (lastLoginHistoryOpt.isPresent()) {
            LoginHistory lastLoginHistory = lastLoginHistoryOpt.get();


            loginHistoryRepository.delete(lastLoginHistory);
        }
    }
}





