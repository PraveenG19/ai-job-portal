package com.aijobportal.backend.service;

import java.util.List;
import com.aijobportal.backend.entity.Job;

public interface JobService {

    Job saveJob(Job job);

    List<Job> getAllJobs();

    Job getJobById(Long id);

    Job updateJob(Long id, Job job);

    void deleteJob(Long id);
}
