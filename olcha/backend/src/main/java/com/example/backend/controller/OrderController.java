package com.example.backend.controller;

import com.example.backend.dto.OrderDTO;
import com.example.backend.entities.Order;
import com.example.backend.entities.Cart;
import com.example.backend.entities.OrderItem;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repositories.OrderRepository;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.ProductRepository;
import com.example.backend.entities.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<OrderDTO> getUserOrders(@PathVariable String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/{userId}")
    public Order placeOrder(@PathVariable String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(cart.getItems());
        order.setStatus("PENDING");
        order.setCreatedAt(new Date());

        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(total);

        // Update product stock
        for (OrderItem item : cart.getItems()) {
            productRepository.findById(item.getProductId()).ifPresent(product -> {
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            });
        }

        cart.getItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}
