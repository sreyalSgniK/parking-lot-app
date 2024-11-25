package com.backend.Carpark.service;

import com.backend.Carpark.model.Booking;
import com.backend.Carpark.model.Parkinglot;
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
        // Determine slot number if not provided
        if (booking.getSlotNumber() == null) {
            Integer maxSlotNumber = bookingRepository.findMaxSlotNumberByParkingLotId(booking.getParkingLot().getId());
            booking.setSlotNumber((maxSlotNumber == null ? 0 : maxSlotNumber) + 1);
        }
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

    public List<Booking> findByUserId(Integer userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> findBookingsWithParkingLotByUserId(Integer userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getBookingsByParkingLot(Parkinglot parkinglot) {
        return bookingRepository.findByParkingLot(parkinglot);
    }
}
