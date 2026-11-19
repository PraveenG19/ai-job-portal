package com.aijobportal.backend.service;

import java.util.List;
import com.aijobportal.backend.entity.Resume;

public interface ResumeService {

    Resume saveResume(Resume resume);

    List<Resume> getAllResumes();

    Resume getResumeById(Long id);

    void deleteResume(Long id);
}