package com.aijobportal.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.service.GeminiService;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/analyze")
    public String analyzeResume(
            @RequestBody String resume) {

        return geminiService.analyzeResume(resume);
    }
}