package com.example.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key signingKey;

    @PostConstruct
    public void init() {
        signingKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ Generate token with custom role claim
    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract username from token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // ✅ Extract role from token
    public String extractRole(String token) {
        return (String) getClaims(token).get("role");
    }

    // ✅ Validate token: user matches and not expired
    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ✅ Check expiration
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // ✅ Centralized claim extractor
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
