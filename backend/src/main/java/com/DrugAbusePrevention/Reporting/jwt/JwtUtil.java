package com.DrugAbusePrevention.Reporting.jwt;

import com.DrugAbusePrevention.Reporting.entity.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "THIS_IS_A_SECRET_KEY_CHANGE_IT_TO_256_BITS_HELLO_HELLO_12345678";
    private final long EXPIRATION = 24 * 60 * 60 * 1000;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(AppUser appUser) {
        return Jwts.builder()
                .setSubject(appUser.getEmail())
                .claim("role", appUser.getRoles())
                .claim("userId",appUser.getUserId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // ✔ 0.11.x syntax
                .compact();

    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        return extractAllClaims(token).getExpiration().after(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())   // ✔ 0.11.x syntax
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}