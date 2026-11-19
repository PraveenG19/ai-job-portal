package com.aijobportal.backend.service;

import java.util.List;
import com.aijobportal.backend.entity.JobApplication;

public interface JobApplicationService {

    JobApplication apply(JobApplication application);

    List<JobApplication> getAllApplications();

    JobApplication getApplicationById(Long id);

    void deleteApplication(Long id);
}