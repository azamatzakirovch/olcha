package com.example.backend.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;

    private String userId;
    private List<OrderItem> items;
    private double totalAmount;
    private String status; // e.g., PENDING, SHIPPED
    private Date createdAt;
}
