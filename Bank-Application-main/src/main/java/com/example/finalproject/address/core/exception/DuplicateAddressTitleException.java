package com.example.finalproject.address.core.exception;

import com.example.finalproject.customer.core.exception.BusinessException;

public class DuplicateAddressTitleException extends BusinessException {
    public DuplicateAddressTitleException(String addressTitle) {
        super(String.format("'%s' başlıklı bir adres zaten mevcut. Lütfen farklı bir başlık girin.", addressTitle));
    }
}
