package com.backend.Carpark.service;

import com.backend.Carpark.model.Account;
import com.backend.Carpark.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // Create or update a user
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    // Get all users
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Get a user by ID
    public Optional<Account> getUserById(Integer account_id) {
        return accountRepository.findById(account_id);
    }

    // Delete a user by ID
    public void deleteUser(Integer account_id) {
        accountRepository.deleteById(account_id);
    }
}
