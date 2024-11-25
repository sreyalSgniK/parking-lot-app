package com.backend.Carpark.repository;

import com.backend.Carpark.model.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkinglotRepository extends JpaRepository<Parkinglot, Integer> {
}
