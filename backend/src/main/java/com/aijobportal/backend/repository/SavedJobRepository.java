package com.aijobportal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aijobportal.backend.entity.SavedJob;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

}