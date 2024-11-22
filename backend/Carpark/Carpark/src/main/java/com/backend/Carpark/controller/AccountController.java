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


@RequestMapping("/users")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Create a new user or update an existing one
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        Account savedAccount = accountService.saveAccount(account);
        return new ResponseEntity<>(savedAccount, HttpStatus.CREATED);
    }

//    @GetMapping
//    public String checkAccount(String username, String password) {
//        return accountService.checkAccount(username, password);
//    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccount() {
        List<Account> accounts = accountService.getAllAccounts();
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getUserById(@PathVariable String account_id) {
        Optional<Account> user = accountService.getUserById(account_id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateUser(@PathVariable String account_id, @RequestBody Account user) {
        Optional<Account> existingUser = accountService.getUserById(account_id);
        if (existingUser.isPresent()) {
            user.setId(account_id);  // Ensure the user ID is set to the path variable ID
            Account updatedUser = accountService.saveAccount(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String account_id) {
        Optional<Account> user = accountService.getUserById(account_id);
        if (user.isPresent()) {
            accountService.deleteUser(account_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
