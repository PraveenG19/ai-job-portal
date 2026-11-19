package com.aijobportal.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.service.AIService;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/analyze")
    public String analyzeResume(@RequestBody String resumeText) {

        return aiService.analyzeResume(resumeText);

    }
}