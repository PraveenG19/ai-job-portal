package com.aijobportal.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "saved_jobs")
@Data
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
}
