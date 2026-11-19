package com.aijobportal.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String description;

    private String website;

    private String location;

    private String email;

    private String phone;

    private String logo;

    private LocalDateTime createdAt = LocalDateTime.now();


    // Company created by HR/Admin user
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
}