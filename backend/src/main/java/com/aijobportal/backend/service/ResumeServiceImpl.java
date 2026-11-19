package com.aijobportal.backend.service;

import java.nio.file.Files;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.Resume;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.repository.ResumeRepository;
import com.aijobportal.backend.service.ResumeService;
import java.nio.file.Paths;
import java.nio.file.Files;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    private ResumeRepository repository;

    @Override
    public Resume saveResume(Resume resume) {
        return repository.save(resume);
    }

    @Override
    public List<Resume> getAllResumes() {
        return repository.findAll();
    }

    @Override
    public Resume getResumeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found with id: " + id));
    }

    

    @Override
public void deleteResume(Long id) {

    Resume resume = getResumeById(id);

    try {
        Files.deleteIfExists(Paths.get(resume.getFilePath()));
    } catch (Exception e) {
        e.printStackTrace();
    }

    repository.delete(resume);
}
}