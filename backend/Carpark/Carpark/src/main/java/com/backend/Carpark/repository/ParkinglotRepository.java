package com.backend.Carpark.repository;

import com.backend.Carpark.model.Parkinglot;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkinglotRepository extends JpaRepository<Parkinglot, Integer> {
    Optional<List<Parkinglot>> findByOwnerId(Integer ownerId);
}
