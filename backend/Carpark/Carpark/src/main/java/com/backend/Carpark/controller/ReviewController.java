package com.backend.Carpark.controller;

import com.backend.Carpark.model.Review;
import com.backend.Carpark.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review savedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAllParkinglot() {
        List<Review> review = reviewService.getAllReviews();
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @GetMapping("/{rid}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer rid) {
        Optional<Review> review = reviewService.getReviewById(rid);
        if (review.isPresent()) {
            return new ResponseEntity<>(review.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{rid}")
    public ResponseEntity<Review> updateReview(@PathVariable Integer rid, @RequestBody Review review) {
        Optional<Review> existingReview = reviewService.getReviewById(rid);
        if (existingReview.isPresent()) {
            review.setRid(rid);
            Review updatedReview = reviewService.saveReview(review);
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{rid}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer rid) {
        Optional<Review> review = reviewService.getReviewById(rid);
        if (review.isPresent()) {
            reviewService.deleteReview(rid);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
