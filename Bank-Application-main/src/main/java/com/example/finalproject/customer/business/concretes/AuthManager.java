package com.example.finalproject.customer.business.concretes;

import com.example.finalproject.common.entity.LoginHistory;
import com.example.finalproject.common.entity.User;
import com.example.finalproject.common.repository.LoginHistoryRepository;
import com.example.finalproject.common.repository.UserRepository;
import com.example.finalproject.common.security.jwt.impl.JWTHelper;
import com.example.finalproject.common.security.token.service.TokenService;
import com.example.finalproject.common.security.user.CustomUserDetail;

import com.example.finalproject.customer.business.abstarcts.AuthService;
import com.example.finalproject.customer.core.constant.Utils;

import com.example.finalproject.customer.core.exception.*;

import com.example.finalproject.customer.core.response.LoginResponse;
import com.example.finalproject.customer.entity.Customer;
import com.example.finalproject.customer.entity.Role;
import com.example.finalproject.customer.repository.CustomerRepository;
import com.example.finalproject.response.ServiceResponse;

import com.example.finalproject.sms.SmsService;
import com.example.finalproject.verificationCode.ActivationCodeStillValidException;
import com.example.finalproject.verificationCode.VerificationCode;
import com.example.finalproject.verificationCode.VerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthManager implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTHelper jwtHelper;
    private final CustomerRepository customerRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SmsService smsService;
    private final LoginHistoryRepository loginHistoryRepository;
    private final TokenService tokenService;

    @Override
    @Transactional
    public ServiceResponse login(String identityNumber, String password, String ipAddress)
            throws LoginFailedException, UserNotActiveException, IncorrectPasswordException, NotFoundIdentityNumberException {

        Optional<Customer> customerOpt = customerRepository.findByIdentityNumberIgnoreCase(identityNumber);

        if (customerOpt.isEmpty()) {
            throw new NotFoundIdentityNumberException();
        }

        Customer customer = customerOpt.orElse(null);

        if (customer != null && !customer.isActive()) {
            throw new UserNotActiveException();
        }

        try {
            // Kullanıcı adı ve şifre doğrulaması
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identityNumber, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();

            List<String> roles;
            roles = Utils.SimpleGrantedAuthorityToListString((Collection<GrantedAuthority>) customUserDetail.getAuthorities());

            // IP adresi değişikliğini kontrol et
            if (isIpAddressChanged(identityNumber, getEffectiveIpAddress(ipAddress))) {

                VerificationCode lastCode = customer.getSessionConfirmationCode();
                if (lastCode != null && !lastCode.isExpired()) {
                    // Şu anki zaman
                    Instant now = Instant.now();

                    // Kodun son kullanma zamanı (LocalDateTime -> Instant)
                    Instant expirationTime = lastCode.getExpiresAt()
                            .atZone(ZoneId.systemDefault()) // Zaman dilimi ekliyoruz
                            .toInstant();

                    // Kalan süreyi hesapla (saniye cinsinden)
                    long remainingTimeInSeconds = Duration.between(now, expirationTime).getSeconds();

                    if (remainingTimeInSeconds > 0) {
                        return new ServiceResponse("Kodun süresi dolmadı. Kalan süre:"+remainingTimeInSeconds,false);
                    }
                }

                sendSms(customer);

                // Yeni IP adresini giriş geçmişine ekle
                LoginHistory newLogin = new LoginHistory();
                newLogin.setUser(customer);
                newLogin.setIpAddress(ipAddress);
                newLogin.setLoginTime(LocalDateTime.now());
                loginHistoryRepository.save(newLogin);

                return new ServiceResponse("Lütfen giriş işlemi için doğrulama kodunu giriniz.", false);
            }

            // JWT token oluşturma işlemi
            String token = jwtHelper.generate(identityNumber, roles);
            customUserDetail.setToken(token);

            log.info("User {} logged in from IP: {}", identityNumber, ipAddress);

            LoginResponse loginResponse = new LoginResponse(token);
            tokenService.deleteAllTokensExcept(token, customer);

            return new ServiceResponse(loginResponse.getToken(), true);

        } catch (AuthenticationException e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());
            throw new IncorrectPasswordException();
        } catch (Exception e) {
            log.error("Giriş işlemi sırasında bir hata oluştu: {}", e.getMessage());
            throw new LoginFailedException();
        }
    }

    public String getEffectiveIpAddress(String actualIpAddress) {
        Random random = new Random();
        int toggle = random.nextInt(2); // 0 veya 1 üretir

        if (toggle == 1) {
            // Rastgele bir IP üret
            return "192.168.1." + random.nextInt(9);
        } else {
            // Gerçek IP adresini döndür
            return actualIpAddress;
        }
    }


    public boolean isIpAddressChanged(String identityNumber, String actualIpAddress) {
        // IP adresini standart bir formata dönüştür
        String effectiveIpAddress = getEffectiveIpAddress(actualIpAddress);

        Optional<Customer> userOpt = customerRepository.findByIdentityNumberIgnoreCase(identityNumber);

        if (userOpt.isPresent()) {
            Customer user = userOpt.get();

            // Kullanıcının son giriş kaydını al
            Optional<LoginHistory> lastLoginHistoryOpt = loginHistoryRepository.findTopByUserOrderByLoginTimeDesc(user);

            if (lastLoginHistoryOpt.isPresent()) {
                String lastIpAddress = lastLoginHistoryOpt.get().getIpAddress();

                // Eğer IP adresi farklıysa yeni IP adresini ekle
                if (!lastIpAddress.equals(effectiveIpAddress)) {
                    // Yeni IP adresini LoginHistory tablosuna ekle
                    LoginHistory newLogin = new LoginHistory();
                    newLogin.setUser(user);
                    newLogin.setIpAddress(effectiveIpAddress);
                    newLogin.setLoginTime(LocalDateTime.now());
                    loginHistoryRepository.save(newLogin);
                    System.out.println("ip adresi değişti");
                    return true; // IP adresi değişmiş, yeni kayıt eklendi
                }
            } else {
                // Eğer hiç giriş kaydı yoksa (ilk giriş durumu)
                LoginHistory firstLogin = new LoginHistory();
                firstLogin.setUser(user);
                firstLogin.setIpAddress(effectiveIpAddress);
                firstLogin.setLoginTime(LocalDateTime.now());
                loginHistoryRepository.save(firstLogin);
                System.out.println("ilk giriş");
                return false; // İlk giriş olduğu için IP değişikliği sayılmaz
            }
        }
        System.out.println("ip adresi aynı");
        return false; // Kullanıcı bulunamadıysa IP değişikliği algılanamaz
    }


    @Override
    public String getUserRoles(String identityNumber) throws NotFoundIdentityNumberException {
        // Eğer email belirli bir admin e-postasına sahipse, ROLE_ADMIN döndür
        if ("admin@gmail.com".equalsIgnoreCase(identityNumber)) {
            return "ROLE_ADMIN";
        }

        // Önce Customer olarak emaili kontrol et
        Optional<Customer> customerOpt = customerRepository.findByIdentityNumberIgnoreCase(identityNumber);
        if (customerOpt.isPresent()) {
            System.out.println("Müşteri bulundu, rol: ROLE_USER");
            return "ROLE_USER";
        }

        // Eğer müşteri bulunamadıysa, satıcı olarak kontrol et


        // Eğer her ikisi de bulunamazsa hata fırlat
        System.out.println("Kullanıcı bulunamadı: " + identityNumber);
        throw new NotFoundIdentityNumberException();
    }

    @Override
    public ServiceResponse logout(long customerId, HttpServletResponse response) {
        // Çerezleri sil
        deleteCookie(response, "userRole");
        deleteCookie(response, "authToken");


        return new ServiceResponse("Çıkış başarılı", true);
    }

    private void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setHttpOnly(true);   // Güvenlik için sadece HTTP üzerinden erişilebilir
        cookie.setPath("/");        // Çerezin geçerli olduğu yol
        cookie.setMaxAge(0);        // Çerezi hemen geçersiz kıl
        response.addCookie(cookie); // Çerezi sil
    }


    public String randomCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(100000, 999999));
    }

    public boolean sendSms(Customer customer) {

        String activationCodeValue = randomCode();
        VerificationCode sessionConfirmationCode = VerificationCode.builder()
                .token(activationCodeValue)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(3))
                .isActive(true)
                .isVerified(false)
                .customer(customer)  // Kaydedilmiş müşteri nesnesini kullan
                .build();

        String body = String.format(
                "Sevgili %s,\n\n" +
                        "AkinBank hesabınıza yeni bir cihazdan giriş yapmayı denediniz. Güvenliğiniz için, aşağıdaki doğrulama kodunu kullanarak bu işlemi onaylayabilirsiniz:\n\n" +
                        "**%s**\n\n" +
                        "Bu kod 3 dakika boyunca geçerlidir. Eğer bu işlemi siz yapmadıysanız, lütfen müşteri hizmetlerimizle iletişime geçin.\n\n" +
                        "Güvenliğiniz bizim için önemlidir.\n\n" +
                        "Saygılarımızla,\n" +
                        "AkinBank Ekibi",
                customer.getName().toUpperCase(), sessionConfirmationCode.getToken());


        System.out.println(activationCodeValue);
        customer.setSessionConfirmationCode(sessionConfirmationCode);
        verificationCodeRepository.save(sessionConfirmationCode);
        return smsService.sendSms(customer.getTelephone(), body);
    }

}
