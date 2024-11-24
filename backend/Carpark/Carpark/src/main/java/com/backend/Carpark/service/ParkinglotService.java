package com.backend.Carpark.service;


import com.backend.Carpark.model.Parkinglot;
import com.backend.Carpark.repository.ParkinglotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkinglotService {

    @Autowired
    private ParkinglotRepository parkinglotRepository;

    // Create or update a user
    public Parkinglot saveParkinglot(Parkinglot parkinglot) {
        return parkinglotRepository.save(parkinglot);
    }

    // Get all users
    public List<Parkinglot> getAllParkinglots() {
        return parkinglotRepository.findAll();
    }

    // Get a user by ID
    public Optional<Parkinglot> getParkinglotById(Integer pid) {
        return parkinglotRepository.findById(pid);
    }

    // Delete a user by ID
    public void deleteParkinglot(Integer pid) {
        parkinglotRepository.deleteById(pid);
    }
}
