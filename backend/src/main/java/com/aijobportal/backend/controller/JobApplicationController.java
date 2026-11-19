package com.aijobportal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.entity.JobApplication;
import com.aijobportal.backend.service.EmailService;
import com.aijobportal.backend.service.JobApplicationService;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<JobApplication> apply(
            @RequestBody JobApplication application) {

        JobApplication savedApplication = service.apply(application);

        emailService.sendEmail(
                savedApplication.getStudent().getEmail(),
                "Job Application Submitted",
                "Hello " + savedApplication.getStudent().getFullName()
                        + ",\n\nYour application for the job has been submitted successfully."
        );

        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAll() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getApplicationById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        service.deleteApplication(id);

        return ResponseEntity.ok("Application deleted successfully");
    }
}