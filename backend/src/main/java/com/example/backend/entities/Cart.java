package com.example.backend.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    private String id;

    @Indexed(unique = true) // ensure one cart per user
    private String userId;

    private List<OrderItem> items = new ArrayList<>();

    // Custom constructor for convenience
    public Cart(String userId) {
        this.userId = userId;
        this.items = new ArrayList<>();
    }
}
