package com.example.backend.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    private String id;

    private String userId;     // ID of the user who created the review
    private String productId;  // ID of the product being reviewed

    private int rating;        // Rating value (1 to 5)
    private String comment;    // Review text

    private Date createdAt;    // Date when the review was posted
}
