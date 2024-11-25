package com.backend.Carpark.repository;

import com.backend.Carpark.model.Booking;
import com.backend.Carpark.model.Parkinglot;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // @Query("SELECT MAX(b.slotNumber) FROM Booking b WHERE b.pid = :parkingLotId")
    // Integer findMaxSlotNumberByParkingLotId(@Param("parkingLotId") Integer
    // parkingLotId);

    @Query("SELECT MAX(b.slotNumber) FROM Booking b WHERE b.parkingLot.id = :parkingLotId")
    Integer findMaxSlotNumberByParkingLotId(@Param("parkingLotId") Integer parkingLotId);

    List<Booking> findByUserId(Integer userId);

    List<Booking> findByParkingLot(Parkinglot parkingLot);

    // @Query("SELECT b FROM Booking b JOIN FETCH b.parkingLot WHERE b.userId =
    // :userId")
    // List<Booking> findBookingsWithParkingLotByUserId(@Param("userId") Integer
    // userId);

}
