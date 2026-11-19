package com.aijobportal.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.dto.LoginRequest;
import com.aijobportal.backend.dto.LoginResponse;
import com.aijobportal.backend.dto.RegisterRequest;
import com.aijobportal.backend.entity.User;
import com.aijobportal.backend.enums.Role;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.security.JwtService;
import com.aijobportal.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserService     userService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtService      jwtService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(Role.STUDENT);
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String role  = user.getRole().name();           // e.g. "STUDENT"
            String token = jwtService.generateToken(user.getEmail(), role);
            return ResponseEntity.ok(new LoginResponse(token, role));
        }
        throw new ResourceNotFoundException("Invalid credentials");
    }
}
