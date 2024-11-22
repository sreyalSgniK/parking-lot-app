package com.backend.Carpark.repository;

import com.backend.Carpark.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
//    public Account findByUsername(String username);
}
