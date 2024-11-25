package com.backend.Carpark.controller;

import com.backend.Carpark.model.Booking;
import com.backend.Carpark.model.Parkinglot;
import com.backend.Carpark.service.BookingService;
import com.backend.Carpark.service.ParkinglotService;

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

    @Autowired
    private ParkinglotService parkinglotService;

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
            // Find the Parkinglot using the pid from the booking request
            Optional<Parkinglot> parkinglot = parkinglotService.getParkinglotById(booking.getParkingLot().getId());

            if (parkinglot.isPresent()) {
                // Set the Parkinglot object (instead of setting pid directly)
                booking.setParkingLot(parkinglot.get());

                // Save the updated booking
                Booking updatedBooking = bookingService.saveBooking(booking);
                return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Invalid Parkinglot id
            }
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

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Integer userId) {
        return bookingService.findByUserId(userId);
    }

    @GetMapping("/bookings/user/{userId}")
    public List<Booking> getBookingsWithParkingLotByUserId(@PathVariable Integer userId) {
        return bookingService.findByUserId(userId);
    }

    @PutMapping("/{bid}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Integer bid) {
        Optional<Booking> booking = bookingService.getBookingById(bid);
        if (booking.isPresent()) {
            Booking updatedBooking = booking.get();
            updatedBooking.setStatus("Cancelled");
            bookingService.saveBooking(updatedBooking); // Save the updated booking
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/parking-lot/{pid}/bookings")
    public ResponseEntity<List<Booking>> getBookingsByParkingLotId(@PathVariable Integer pid) {
        Optional<Parkinglot> parkinglotOptional = parkinglotService.getParkinglotById(pid);
        if (!parkinglotOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Booking> bookings = bookingService.getBookingsByParkingLot(parkinglotOptional.get());
        if (bookings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}
