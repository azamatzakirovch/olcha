package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entities.Guest;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Guest user) {
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required fields");
        }

        Optional<Guest> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(userRepository.count() == 0 ? "ADMIN" : "USER");

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Guest registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Guest user) {
        Optional<Guest> optionalUser = userRepository.findByUsername(user.getUsername());

        if (optionalUser.isPresent()) {
            Guest existingUser = optionalUser.get();
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                String token = jwtUtil.generateToken(existingUser.getUsername(), existingUser.getRole());
                return ResponseEntity.ok(Map.of("token", token));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        Optional<Guest> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(UserMapper.toDTO(optionalUser.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found");
    }
}
