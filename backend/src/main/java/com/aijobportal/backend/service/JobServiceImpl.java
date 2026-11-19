package com.aijobportal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.Job;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.repository.JobRepository;
import com.aijobportal.backend.service.JobService;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found with id: " + id));
    }

    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = getJobById(id);

        existing.setTitle(job.getTitle());
        existing.setDescription(job.getDescription());
        existing.setLocation(job.getLocation());
        existing.setSalary(job.getSalary());
        existing.setExperience(job.getExperience());
        existing.setJobType(job.getJobType());
        existing.setCompany(job.getCompany());

        return jobRepository.save(existing);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.delete(getJobById(id));
    }
}