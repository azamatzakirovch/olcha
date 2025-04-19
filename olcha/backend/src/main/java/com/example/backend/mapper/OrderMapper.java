package com.example.backend.mapper;

import com.example.backend.dto.OrderDTO;
import com.example.backend.dto.OrderItemDTO;
import com.example.backend.entities.Order;
import com.example.backend.entities.OrderItem;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static OrderDTO toDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setItems(toItemDTOList(order.getItems()));
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(sdf.format(order.getCreatedAt()));
        return dto;
    }

    public static List<OrderItemDTO> toItemDTOList(List<OrderItem> items) {
        return items.stream().map(item -> {
            OrderItemDTO dto = new OrderItemDTO();
            dto.setProductId(item.getProductId());
            dto.setProductName(item.getProductName());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            return dto;
        }).collect(Collectors.toList());
    }
}
