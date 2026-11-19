package com.aijobportal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.SavedJob;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.repository.SavedJobRepository;
import com.aijobportal.backend.service.SavedJobService;

@Service
public class SavedJobServiceImpl implements SavedJobService {

    @Autowired
    private SavedJobRepository repository;

    @Override
    public SavedJob saveJob(SavedJob savedJob) {
        return repository.save(savedJob);
    }

    @Override
    public List<SavedJob> getAllSavedJobs() {
        return repository.findAll();
    }

    @Override
    public SavedJob getSavedJobById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Saved Job not found with id: " + id));
    }

    @Override
    public void deleteSavedJob(Long id) {
        repository.delete(getSavedJobById(id));
    }
}