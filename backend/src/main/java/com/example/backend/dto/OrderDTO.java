package com.example.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private String id;
    private String userId;
    private List<OrderItemDTO> items;
    private double totalAmount;
    private String status;
    private String createdAt;
}
