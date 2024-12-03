package com.example.finalproject.verificationCode;

import com.example.finalproject.customer.core.exception.BusinessException;

public class ActivationCodeStillValidException extends BusinessException {
    public ActivationCodeStillValidException(long remainingTimeInSeconds) {
        super("Mevcut aktivasyon kodu henüz geçerliliğini yitirmedi. Lütfen işleminizi tamamlamak için "
                + remainingTimeInSeconds + " saniye bekleyiniz.");
    }
}
