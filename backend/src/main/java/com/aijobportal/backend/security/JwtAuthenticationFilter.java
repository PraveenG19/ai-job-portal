package com.aijobportal.backend.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("========== JWT FILTER START ==========");

        String header = request.getHeader("Authorization");
        System.out.println("Authorization Header : " + header);

        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("Bearer Token Not Found");
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        System.out.println("JWT Token : " + token);

        try {

            String email = jwtService.extractUsername(token);
            System.out.println("Email From Token : " + email);

            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                System.out.println("User Loaded : " + userDetails.getUsername());

                if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                    System.out.println("Token Valid");

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    auth.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(auth);

                    System.out.println("Authentication Successful");
                } else {
                    System.out.println("Token Invalid");
                }
            }

        } catch (Exception e) {
            System.out.println("JWT ERROR : " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}