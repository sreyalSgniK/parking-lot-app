package com.backend.Carpark.model;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bid;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    // @Column(name = "parking_lot_id", insertable = false, updatable = false)
    // private Integer parkingLotId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_lot_id", referencedColumnName = "parking_lot_id", nullable = false)
    @JsonIgnore
    private Parkinglot parkingLot;

    @CreationTimestamp
    @Column(name = "booking_date", nullable = false, updatable = false)
    private LocalDateTime bookingDate;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "status", columnDefinition = "ENUM('active', 'completed', 'cancelled') DEFAULT 'active'")
    private String status = "active";

    @Column(name = "slot_number", nullable = false)
    private Integer slotNumber;

    // Getters and Setters

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPid() {
        return parkingLot.getId();
    }

    public void setPid(Integer pid) {
        this.parkingLot.setPid(pid);
    }

    public Parkinglot getParkingLot() {
        return parkingLot;
    }

    public void setParkingLot(Parkinglot parkingLot) {
        this.parkingLot = parkingLot;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getSlotNumber() {
        return slotNumber;
    }

    public void setSlotNumber(Integer slotNumber) {
        this.slotNumber = slotNumber;
    }
}
