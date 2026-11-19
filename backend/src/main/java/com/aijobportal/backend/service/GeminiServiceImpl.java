package com.aijobportal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.aijobportal.backend.service.GeminiService;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Override
    public String analyzeResume(String resumeText) {

        String url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

        String body = """
                {
                  "contents":[
                    {
                      "parts":[
                        {
                          "text":"Analyze this resume and give score, strengths, weaknesses, missing skills and suitable jobs:\\n%s"
                        }
                      ]
                    }
                  ]
                }
                """.formatted(resumeText);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", apiKey);

        HttpEntity<String> entity =
                new HttpEntity<>(body, headers);

        return restTemplate
                .postForObject(url, entity, String.class);
    }
}