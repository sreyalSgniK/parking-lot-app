package com.backend.Carpark.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "booking_id")
    private Integer bid;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "parking_lot_id")
    private Integer pid;
    @Column(name = "booking_date")
    private String bookingDate;
    @Column(name = "start_time")
    private String startTime;
    @Column(name = "end_time")
    private String endTime;
    @Column(name = "status")
    private String status;
    @Column(name = "slot_number")
    private Integer slotNumber;

    // Getters and setters


    public Integer getBid() {
        return bid;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getPid() {
        return pid;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getStatus() {
        return status;
    }

    public Integer getSlotNumber() {
        return slotNumber;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setSlotNumber(Integer slotNumber) {
        this.slotNumber = slotNumber;
    }
}
