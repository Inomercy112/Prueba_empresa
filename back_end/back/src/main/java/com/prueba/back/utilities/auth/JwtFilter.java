package com.prueba.back.utilities.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class JwtFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        logger.info("Request URI: {}", request.getRequestURI());
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            logger.info("Authorization header found. Token extracted.");
        } else {
            logger.info("No Authorization header or does not start with Bearer.");
        }
        if (token != null) {
            try {
                Map<String, Object> claims = JwtUtil.validateToken(token);
                String username = (String) claims.get("sub");
                logger.info("Token valid. Subject: {}", username);
                if (username != null) {
                    User principal = new User(username, "", Collections.emptyList());
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            principal, null, principal.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    logger.info("Authentication set in SecurityContext for user: {}", username);
                }
                filterChain.doFilter(request, response);
                return;
            } catch (Exception e) {
                e.printStackTrace();
                logger.warn("Token inválido o expirado: {}", e.getMessage());
                SecurityContextHolder.clearContext();
                if (!response.isCommitted()) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("{\"error\":\"Token inválido o expirado\"}");
                }
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
