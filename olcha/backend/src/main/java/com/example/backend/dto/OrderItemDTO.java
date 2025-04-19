package com.example.backend.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private String productId;
    private String productName;
    private int quantity;
    private double price;
}

