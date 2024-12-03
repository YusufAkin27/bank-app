package com.example.finalproject.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tüm yollar için CORS ayarları
                .allowedOrigins("http://localhost:3000") // React uygulamanızın URL'si
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP metodları
                .allowedHeaders("Authorization", "Content-Type", "Accept") // İzin verilen başlıklar
                .allowCredentials(true); // Kimlik doğrulama bilgilerine izin ver
    }
}
