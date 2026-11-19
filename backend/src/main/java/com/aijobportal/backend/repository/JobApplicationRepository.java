package com.aijobportal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aijobportal.backend.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

}
