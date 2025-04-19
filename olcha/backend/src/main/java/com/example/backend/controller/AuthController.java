package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entities.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER"); // ✅ Enforce default role always

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // ✅ PROFILE (Consider moving to UserController later)
    @GetMapping("/me")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(username);

        if (user != null) {
            return ResponseEntity.ok(UserMapper.toDTO(user));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
