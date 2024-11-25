package com.backend.Carpark.controller;

import com.backend.Carpark.model.Booking;
import com.backend.Carpark.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBookinglot(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.saveBooking(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBooking() {
        List<Booking> booking = bookingService.getAllBookings();
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @GetMapping("/{bid}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer bid) {
        Optional<Booking> booking = bookingService.getBookingById(bid);
        if (booking.isPresent()) {
            return new ResponseEntity<>(booking.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{bid}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Integer bid, @RequestBody Booking booking) {
        Optional<Booking> existingBooking = bookingService.getBookingById(bid);
        if (existingBooking.isPresent()) {
            booking.setPid(bid);
            Booking updatedBooking = bookingService.saveBooking(booking);
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{bid}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer bid) {
        Optional<Booking> booking = bookingService.getBookingById(bid);
        if (booking.isPresent()) {
            bookingService.deleteBooking(bid);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
