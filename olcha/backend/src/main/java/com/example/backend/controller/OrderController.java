package com.example.backend.controller;

import com.example.backend.dto.OrderDTO;
import com.example.backend.entities.Order;
import com.example.backend.entities.Cart;
import com.example.backend.entities.OrderItem;
import com.example.backend.entities.Product;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repositories.OrderRepository;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable String userId) {
        List<OrderDTO> orders = orderRepository.findByUserId(userId).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> placeOrder(@PathVariable String userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found");
        }

        Cart cart = optionalCart.get();
        if (cart.getItems().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cart is empty");
        }

        // Copy items from cart to avoid clearing affecting the saved order
        List<OrderItem> orderItems = new ArrayList<>(cart.getItems());

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(orderItems);
        order.setStatus("PENDING");
        order.setCreatedAt(new Date());

        double total = orderItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(total);

        // Update product stock
        for (OrderItem item : orderItems) {
            productRepository.findById(item.getProductId()).ifPresent(product -> {
                int updatedStock = product.getStock() - item.getQuantity();
                product.setStock(Math.max(updatedStock, 0)); // Ensure stock doesn't go negative
                productRepository.save(product);
            });
        }

        // Clear the cart after processing
        cart.getItems().clear();
        cartRepository.save(cart);

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }

        Order order = optionalOrder.get();
        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }
}
