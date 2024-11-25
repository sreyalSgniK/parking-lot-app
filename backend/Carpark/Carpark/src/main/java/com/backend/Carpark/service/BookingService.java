package com.backend.Carpark.service;

import com.backend.Carpark.model.Booking;
import com.backend.Carpark.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Integer bid) {
        return bookingRepository.findById(bid);
    }

    public void deleteBooking(Integer bid) {
        bookingRepository.deleteById(bid);
    }
}
