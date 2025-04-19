package com.example.backend.controller;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entities.Product;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable String id) {
        return productRepository.findById(id)
                .map(ProductMapper::toDTO)
                .orElse(null);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    @PostMapping
    public ProductDTO addProduct(@RequestBody ProductDTO dto) {
        Product product = ProductMapper.toEntity(dto);
        return ProductMapper.toDTO(productRepository.save(product));
    }

    @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable String id, @RequestBody ProductDTO dto) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setDescription(dto.getDescription());
            existing.setPrice(dto.getPrice());
            existing.setStock(dto.getStock());
            existing.setImageUrl(dto.getImageUrl());
            return ProductMapper.toDTO(productRepository.save(existing));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }
}
