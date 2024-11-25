package com.backend.Carpark.repository;

import com.backend.Carpark.model.Parkinglot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkinglotRepository extends JpaRepository<Parkinglot, Integer> {
}
