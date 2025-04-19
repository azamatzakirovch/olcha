package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entities.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Get current user's profile using JWT
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(UserMapper.toDTO(user));
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Update current user (username or email only)
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateCurrentUser(@RequestHeader("Authorization") String authHeader,
                                                     @RequestBody UserDTO userDTO) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            userRepository.save(user);
            return ResponseEntity.ok(UserMapper.toDTO(user));
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Delete current user
    @DeleteMapping("/me")
    public ResponseEntity<String> deleteCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username);
        if (user != null) {
            userRepository.delete(user);
            return ResponseEntity.ok("User deleted");
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Admin: get all users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ Admin: get specific user
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> ResponseEntity.ok(UserMapper.toDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
