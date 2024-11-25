package com.backend.Carpark.controller;

import com.backend.Carpark.model.Parkinglot;
import com.backend.Carpark.service.ParkinglotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/parkinglots")
public class ParkinglotController {

    @Autowired
    private ParkinglotService parkinglotService;

    @PostMapping
    public ResponseEntity<Parkinglot> createParkinglot(@RequestBody Parkinglot parkinglot) {
        Parkinglot savedParkinglot = parkinglotService.saveParkinglot(parkinglot);
        return new ResponseEntity<>(savedParkinglot, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Parkinglot>> getAllParkinglot() {
        List<Parkinglot> parkinglot = parkinglotService.getAllParkinglots();
        return new ResponseEntity<>(parkinglot, HttpStatus.OK);
    }

    @GetMapping("/{pid}")
    public ResponseEntity<Parkinglot> getParkinglotById(@PathVariable Integer pid) {
        Optional<Parkinglot> parkinglot = parkinglotService.getParkinglotById(pid);
        if (parkinglot.isPresent()) {
            return new ResponseEntity<>(parkinglot.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{pid}")
    public ResponseEntity<Parkinglot> updateParkinglot(@PathVariable Integer pid, @RequestBody Parkinglot parkinglot) {
        Optional<Parkinglot> existingParkinglot = parkinglotService.getParkinglotById(pid);
        if (existingParkinglot.isPresent()) {
            parkinglot.setPid(pid); // Ensure the user ID is set to the path variable ID
            Parkinglot updatedParkinglot = parkinglotService.saveParkinglot(parkinglot);
            return new ResponseEntity<>(updatedParkinglot, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{pid}")
    public ResponseEntity<Void> deleteParkinglot(@PathVariable Integer pid) {
        Optional<Parkinglot> parkinglot = parkinglotService.getParkinglotById(pid);
        if (parkinglot.isPresent()) {
            parkinglotService.deleteParkinglot(pid);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
