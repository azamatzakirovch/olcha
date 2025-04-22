package com.example.backend.controller;

import com.example.backend.dto.CartDTO;
import com.example.backend.dto.OrderItemDTO;
import com.example.backend.entities.Cart;
import com.example.backend.entities.OrderItem;
import com.example.backend.entities.Product;
import com.example.backend.entities.Guest;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // 🧾 Add item to cart
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody OrderItemDTO itemDTO,
                                       @RequestHeader("Authorization") String authHeader) {

        String token = extractToken(authHeader);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String username = jwtUtil.extractUsername(token);
        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Guest not found");
        }

        Optional<Product> productOpt = productRepository.findById(itemDTO.getProductId());
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid product ID");
        }

        Product product = productOpt.get();
        if (itemDTO.getQuantity() <= 0) {
            return ResponseEntity.badRequest().body("Quantity must be greater than 0");
        }

        if (itemDTO.getQuantity() > product.getStock()) {
            return ResponseEntity.badRequest().body("Requested quantity exceeds available stock");
        }

        Guest user = optionalUser.get();
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart(user.getId());
            return cartRepository.save(newCart);
        });

        Optional<OrderItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            OrderItem existing = existingItem.get();
            existing.setQuantity(existing.getQuantity() + itemDTO.getQuantity());
        } else {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setProductName(product.getName());
            orderItem.setPrice(product.getPrice());
            orderItem.setQuantity(itemDTO.getQuantity());
            cart.getItems().add(orderItem);
        }

        cartRepository.save(cart);
        return ResponseEntity.ok("Item added to cart");
    }

    // 🛒 Get current cart
    @GetMapping
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String username = jwtUtil.extractUsername(token);
        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Guest not found");
        }

        Guest user = optionalUser.get();
        Cart cart = cartRepository.findByUserId(user.getId()).orElseGet(() -> {
            Cart newCart = new Cart(user.getId());
            return cartRepository.save(newCart);
        });

        CartDTO cartDTO = new CartDTO();
        cartDTO.setUserId(user.getId());
        cartDTO.setItems(
                cart.getItems().stream().map(item -> {
                    OrderItemDTO dto = new OrderItemDTO();
                    dto.setProductId(item.getProductId());
                    dto.setProductName(item.getProductName());
                    dto.setPrice(item.getPrice());
                    dto.setQuantity(item.getQuantity());
                    return dto;
                }).collect(Collectors.toList())
        );

        return ResponseEntity.ok(cartDTO);
    }

    // 🗑️ Clear cart
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String username = jwtUtil.extractUsername(token);
        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Guest not found");
        }

        Guest user = optionalUser.get();
        cartRepository.findByUserId(user.getId()).ifPresent(cartRepository::delete);

        return ResponseEntity.ok("Cart cleared successfully");
    }

    // 🔐 Token extractor helper
    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7);
    }
}
