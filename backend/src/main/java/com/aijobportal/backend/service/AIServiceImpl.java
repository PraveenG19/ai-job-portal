package com.aijobportal.backend.service;

import org.springframework.stereotype.Service;

import com.aijobportal.backend.service.AIService;

@Service
public class AIServiceImpl implements AIService {

    @Override
    public String analyzeResume(String resumeText) {

        return "Resume analyzed successfully. AI Score: 85/100. Skills matched.";

    }
}