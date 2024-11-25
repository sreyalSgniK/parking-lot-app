package com.backend.Carpark.service;

import com.backend.Carpark.model.Account;
import com.backend.Carpark.model.LoginRequest;
import com.backend.Carpark.model.Parkinglot;
import com.backend.Carpark.repository.AccountRepository;
import com.backend.Carpark.repository.ParkinglotRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ParkinglotRepository parkinglotRepository;

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Integer account_id) {
        return accountRepository.findById(account_id);
    }

    public void deleteUser(Integer account_id) {
        accountRepository.deleteById(account_id);
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Optional<Account> account = accountRepository.findByUsername(loginRequest.getUsername());

        if (account.isPresent() && account.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(account.get());
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    public Optional<List<Parkinglot>> getParkinglotByOwnerId(Integer id) {
        return parkinglotRepository.findByOwnerId(id);
    }
}
