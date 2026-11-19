package com.aijobportal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.entity.SavedJob;
import com.aijobportal.backend.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    @Autowired
    private SavedJobService service;

    @PostMapping
    public ResponseEntity<SavedJob> saveJob(
            @RequestBody SavedJob savedJob) {

        return new ResponseEntity<>(
                service.saveJob(savedJob),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SavedJob>> getAllSavedJobs() {

        return ResponseEntity.ok(
                service.getAllSavedJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SavedJob> getSavedJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getSavedJobById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSavedJob(
            @PathVariable Long id) {

        service.deleteSavedJob(id);

        return ResponseEntity.ok("Saved Job deleted successfully");
    }
}