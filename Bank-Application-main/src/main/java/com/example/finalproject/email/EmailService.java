package com.example.finalproject.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // E-posta kuyruğu
    private final EmailQueue emailQueue = new EmailQueue();

    // İş parçacığı havuzu
    private final ExecutorService executorService = Executors.newFixedThreadPool(5);

    // E-posta kuyruğuna yeni bir e-posta ekleme
    public void queueEmail(EmailMessage emailMessage) {
        emailQueue.enqueue(emailMessage);
        // E-posta kuyruğa eklendiğinde hemen gönderim işlemini başlat
        executorService.submit(() -> processEmail(emailMessage));
    }

    // E-postayı işleyen yöntem
    private void processEmail(EmailMessage email) {
        sendEmail(email);
    }

    // E-postayı gönderen yöntem
    private void sendEmail(EmailMessage email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getToEmail());
        message.setSubject(email.getSubject());
        message.setText(email.getBody());
        message.setFrom("AkinMarket27@gmail.com");

        int attempts = 3; // Hata durumunda 3 kez deneyecek
        boolean sent = false;

        while (attempts > 0 && !sent) {
            try {
                mailSender.send(message);
                System.out.println("E-posta başarıyla gönderildi: " + email.getToEmail());
                sent = true;
            } catch (Exception e) {
                System.out.println("E-posta gönderim hatası: " + e.getMessage());
                attempts--;
                if (attempts == 0) {
                    System.out.println("E-posta tekrar kuyruğa eklendi: " + email.getToEmail());
                    queueEmail(email); // Hata durumunda e-postayı yeniden kuyruğa ekle
                }
            }
        }
    }

    // Belirli aralıklarla e-postaları gönderen yöntem
    @Scheduled(fixedRate = 60000) // Her dakika çalışacak
    public void sendEmails() {
        // Gönderilecek e-postaları işle
        int batchSize = Math.max(1, emailQueue.size()); // Eğer kuyrukta e-posta yoksa en az 1 göndermeye çalış
        sendBatchEmails(batchSize);
    }

    private void sendBatchEmails(int batchSize) {
        List<EmailMessage> emailBatch = new ArrayList<>();

        while (!emailQueue.isEmpty() && emailBatch.size() < batchSize) {
            try {
                EmailMessage email = emailQueue.dequeue();
                emailBatch.add(email);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Hata durumunda iş parçacığını kes
                System.out.println("E-posta gönderim işlemi kesildi: " + e.getMessage());
            }
        }

        // E-posta grubunu asenkron olarak gönder
        for (EmailMessage email : emailBatch) {
            executorService.submit(() -> sendEmail(email));
        }
    }
}
