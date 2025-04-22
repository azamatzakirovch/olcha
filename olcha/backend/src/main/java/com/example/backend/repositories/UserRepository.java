package com.example.backend.repositories;

import com.example.backend.entities.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Guest, String> {
    Optional<Guest> findByUsername(String username);
}
