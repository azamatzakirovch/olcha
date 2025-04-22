package com.example.backend.controller;

import com.example.backend.entities.Review;
import com.example.backend.entities.User;
import com.example.backend.repositories.ReviewRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> addReview(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody Review review) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        User user = optionalUser.get();
        review.setUserId(user.getId());
        review.setCreatedAt(new Date());

        Review saved = reviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable String id) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }

        User user = optionalUser.get();
        Review review = optionalReview.get();

        if (!review.getUserId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed to delete this review");
        }

        reviewRepository.delete(review);
        return ResponseEntity.ok("Review deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable String id,
                                          @RequestBody Review reviewDetails) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }

        User user = optionalUser.get();
        Review review = optionalReview.get();

        if (!review.getUserId().equals(user.getId()) && !"ADMIN".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed to update this review");
        }

        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());
        Review updated = reviewRepository.save(review);
        return ResponseEntity.ok(updated);
    }
}
