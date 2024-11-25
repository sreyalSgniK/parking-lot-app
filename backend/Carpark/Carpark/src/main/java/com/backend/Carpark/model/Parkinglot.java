package com.backend.Carpark.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "parking_lot")
public class Parkinglot {

    @Id
    @Column(name = "parking_lot_id")
    private Integer pid;
    @Column(name = "owner_id")
    private Integer ownerId;
    @Column(name = "name")
    private String pname;
    @Column(name = "location")
    private String location;
    @Column(name = "total_slots")
    private Integer total;
    @Column(name = "available_slots")
    private Integer available;
    @Column(name = "price_per_hour")
    private BigDecimal price;
    @Column(name = "description")
    private String description;
    @Column(name = "created_at")
    private String created_at;

    // Getters and setters
    public Integer getId() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setUsername(String pname) {
        this.pname = pname;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
