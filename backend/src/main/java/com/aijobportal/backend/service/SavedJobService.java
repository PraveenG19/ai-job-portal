package com.aijobportal.backend.service;

import java.util.List;

import com.aijobportal.backend.entity.SavedJob;

public interface SavedJobService {

    SavedJob saveJob(SavedJob savedJob);

    List<SavedJob> getAllSavedJobs();

    SavedJob getSavedJobById(Long id);

    void deleteSavedJob(Long id);
}