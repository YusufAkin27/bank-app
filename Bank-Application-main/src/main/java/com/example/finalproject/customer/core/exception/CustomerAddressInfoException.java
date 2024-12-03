package com.example.finalproject.customer.core.exception;

public class CustomerAddressInfoException extends BusinessException {

    public CustomerAddressInfoException() {
        super("Bu müşteri zaten bir adres bilgisine sahiptir. Yeni bir adres eklemek için mevcut adresi güncelleyin.");
    }
}
