package com.example.finalproject.transfer.business.abstracts;

import com.example.finalproject.debitCard.core.exceptions.DebitCardNotActiveException;
import com.example.finalproject.debitCard.core.exceptions.NotFoundDebitCardException;
import com.example.finalproject.customer.core.exception.CustomerNotFoundException;
import com.example.finalproject.response.ServiceResponse;
import com.example.finalproject.transfer.exception.*;
import com.example.finalproject.transfer.entity.Transfer;

import java.util.List;


public interface TransferService {
    ServiceResponse sendMoney(long customerId,Transfer transfer) throws NotFoundDebitCardException, WrongNameAndSurnameException, DebitCardNotActiveException, InsufficientBalanceException, TransferAmountOutOfRangeException, TransferTimeNotAllowedException, CustomerNotFoundException, IbanDoesNotBelongToYouException, NotFoundIbanException, DebitCardNotActiveException;

    List<Transfer> getAllTransfers() ;


}
