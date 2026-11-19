package com.aijobportal.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "resumes")
@Data
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String filePath;

    @OneToOne
    @JoinColumn(name = "student_id")
    private User student;
}