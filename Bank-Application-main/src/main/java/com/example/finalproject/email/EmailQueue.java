package com.example.finalproject.email;

import java.util.concurrent.LinkedBlockingQueue;

public class EmailQueue {
    // LinkedBlockingQueue kullanarak kuyruk tanımlanır
    private final LinkedBlockingQueue<EmailMessage> queue = new LinkedBlockingQueue<>();

    // Kuyruğa bir e-posta ekleme
    public void enqueue(EmailMessage email) {
        if (email != null) {
            try {
                queue.put(email); // E-posta kuyruğa eklenir; bu metod kuyruk doluysa bekler
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // Hata durumunda iş parçacığını kes
                System.out.println("E-posta kuyruğa eklenirken kesildi: " + e.getMessage());
            }
        }
    }

    // Kuyruktan bir e-posta alma, kuyruk boşsa bekler
    public EmailMessage dequeue() throws InterruptedException {
        return queue.take(); // Kuyruktan bir e-posta alır
    }

    // Kuyruğun boş olup olmadığını kontrol etme
    public boolean isEmpty() {
        return queue.isEmpty();
    }

    // Kuyruğun boyutunu döndürür
    public int size() {
        return queue.size();
    }

    // Kuyruktaki tüm e-postaları temizleme
    public void clear() {
        queue.clear(); // Tüm e-postaları kuyruğdan temizler
    }
}
