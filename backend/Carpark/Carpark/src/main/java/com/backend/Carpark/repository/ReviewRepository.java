package com.backend.Carpark.repository;

import com.backend.Carpark.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}

