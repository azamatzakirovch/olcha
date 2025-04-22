package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entities.Guest;

public class UserMapper {

    public static UserDTO toDTO(Guest user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public static Guest toEntity(UserDTO dto) {
        Guest user = new Guest();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        // Password intentionally left out for security
        return user;
    }
}

