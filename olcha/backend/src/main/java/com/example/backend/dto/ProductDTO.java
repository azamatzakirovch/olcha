package com.example.backend.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String imageUrl;
}
