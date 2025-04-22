package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entities.Guest;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            UserDTO dto = UserMapper.toDTO(optionalUser.get());
            return ResponseEntity.ok(dto);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found");
    }

    // ✅ Update current user (username or email only)
    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentUser(@RequestHeader("Authorization") String authHeader,
                                               @RequestBody UserDTO userDTO) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found");
        }

        Guest user = optionalUser.get();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        userRepository.save(user);

        return ResponseEntity.ok(UserMapper.toDTO(user));
    }

    // ✅ Delete current user
    @DeleteMapping("/me")
    public ResponseEntity<String> deleteCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Optional<Guest> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found");
        }

        userRepository.delete(optionalUser.get());
        return ResponseEntity.ok("Guest deleted successfully");
    }

    // ✅ Admin: get all users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    // ✅ Admin: get specific user
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        Optional<Guest> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(UserMapper.toDTO(user.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Guest not found");
    }
}
