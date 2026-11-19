package com.aijobportal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.JobApplication;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.repository.JobApplicationRepository;
import com.aijobportal.backend.service.JobApplicationService;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    @Autowired
    private JobApplicationRepository repository;

    @Override
    public JobApplication apply(JobApplication application) {
        return repository.save(application);
    }

    @Override
    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    @Override
    public JobApplication getApplicationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found with id: " + id));
    }

    @Override
    public void deleteApplication(Long id) {
        repository.delete(getApplicationById(id));
    }
}