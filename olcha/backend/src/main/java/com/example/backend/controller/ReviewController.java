package com.example.backend.controller;

import com.example.backend.entities.Review;
import com.example.backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        review.setCreatedAt(new Date());
        return reviewRepository.save(review);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable String productId) {
        return reviewRepository.findByProductId(productId);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) {
        reviewRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable String id, @RequestBody Review reviewDetails) {
        return reviewRepository.findById(id).map(review -> {
            review.setRating(reviewDetails.getRating());
            review.setComment(reviewDetails.getComment());
            return reviewRepository.save(review);
        }).orElse(null);
    }
}
