package com.aijobportal.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.aijobportal.backend.enums.Role;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;
}