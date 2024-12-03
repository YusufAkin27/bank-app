package com.example.finalproject.sms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initTwilio() {
        Twilio.init(accountSid, authToken);

    }

    public boolean sendSms(String phoneNumber, String messageBody) {
        try {
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(phoneNumber), // Alıcı numarası
                    new com.twilio.type.PhoneNumber(twilioPhoneNumber), // Gönderen numarası
                    messageBody // Mesaj içeriği
            ).create();

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
