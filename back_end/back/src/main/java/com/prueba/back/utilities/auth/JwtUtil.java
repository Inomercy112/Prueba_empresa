package com.prueba.back.utilities.auth;

import com.prueba.back.entity.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class JwtUtil {
    private static final String SECRET = System.getenv().getOrDefault("JWT_SECRET", "U2VjcmV0X2tleV9wYXJhX21pY3Jvc2VydmljaW9zX2RlX2xhX2ZhYnJpY2E=");
    private static final Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    private final long expirationTime;

    public JwtUtil(long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String generateToken(Long userId, Role role) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("roles", role.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    public static Map<String, Object> validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static Date getExpirationDateFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }



}