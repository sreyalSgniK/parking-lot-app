package com.backend.Carpark.repository;

import com.backend.Carpark.model.Account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByUsername(String username);
}
