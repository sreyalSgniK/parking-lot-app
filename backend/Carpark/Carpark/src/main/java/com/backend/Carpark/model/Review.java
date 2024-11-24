package com.backend.Carpark.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @Column(name = "review_id")
    private Integer rid;
    @Column(name = "parking_lot_id")
    private Integer pid;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "rating")
    private Integer rating;
    @Column(name = "comment")
    private String comment;
    @Column(name = "created_at")
    private String created_at;

}
