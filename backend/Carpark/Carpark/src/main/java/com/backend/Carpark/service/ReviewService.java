package com.backend.Carpark.service;

import com.backend.Carpark.model.Review;
import com.backend.Carpark.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Integer rid) {
        return reviewRepository.findById(rid);
    }

    public void deleteReview(Integer rid) {
        reviewRepository.deleteById(rid);
    }
}
