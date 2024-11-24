package com.backend.Carpark.controller;

import com.backend.Carpark.model.Account;
import com.backend.Carpark.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Create a new user or update an existing one
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account savedAccount = accountService.saveAccount(account);
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccount() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getUserById(@PathVariable Integer id) {
        Optional<Account> user = accountService.getAccountById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateUser(@PathVariable Integer id, @RequestBody Account account) {
        Optional<Account> existingUser = accountService.getAccountById(id);
        if (existingUser.isPresent()) {
            account.setAccount_id(id);  // Ensure the user ID is set to the path variable ID
            Account updatedUser = accountService.saveAccount(account);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        Optional<Account> user = accountService.getAccountById(id);
        if (user.isPresent()) {
            accountService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
