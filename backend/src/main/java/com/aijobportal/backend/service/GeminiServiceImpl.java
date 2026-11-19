package com.aijobportal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Autowired private RestTemplate restTemplate;

    @Value("${gemini.api.key:}")
    private String apiKey;

    // ── Known skills by category ─────────────────────────────────────────────
    private static final Map<String, List<String>> SKILL_CATEGORIES = new LinkedHashMap<>();
    static {
        SKILL_CATEGORIES.put("Programming Languages",
            List.of("java","python","javascript","typescript","kotlin","swift","c++","c#","go","rust","scala","ruby","php","r"));
        SKILL_CATEGORIES.put("Frontend",
            List.of("react","angular","vue","html","css","bootstrap","tailwind","sass","next.js","redux","jquery"));
        SKILL_CATEGORIES.put("Backend",
            List.of("spring","spring boot","node.js","express","django","flask","fastapi","laravel","hibernate","rest","graphql","microservices"));
        SKILL_CATEGORIES.put("Database",
            List.of("mysql","postgresql","mongodb","redis","oracle","sql","nosql","cassandra","dynamodb","h2","sqlite"));
        SKILL_CATEGORIES.put("Cloud & DevOps",
            List.of("aws","azure","gcp","docker","kubernetes","jenkins","ci/cd","terraform","ansible","linux","git","github","gitlab"));
        SKILL_CATEGORIES.put("AI & Data",
            List.of("machine learning","deep learning","tensorflow","pytorch","pandas","numpy","scikit-learn","nlp","data science","ai","llm"));
        SKILL_CATEGORIES.put("Mobile",
            List.of("android","ios","react native","flutter","xamarin","kotlin","swift"));
        SKILL_CATEGORIES.put("Testing",
            List.of("junit","selenium","jest","cypress","postman","mockito","testing","qa"));
    }

    private static final List<String> ALL_IN_DEMAND = List.of(
        "kubernetes","terraform","rust","go","typescript","react","spring boot",
        "aws","docker","machine learning","deep learning","graphql","next.js","flutter"
    );

    @Override
    public String analyzeResume(String resumeText) {
        // Try Gemini first if key is configured
        if (apiKey != null && !apiKey.isBlank()) {
            try { return callGemini(resumeText); } catch (Exception ignored) {}
        }
        // Fall back to local smart analysis
        return localAnalysis(resumeText);
    }

    // ── Gemini API call ───────────────────────────────────────────────────────
    private String callGemini(String resumeText) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
        String prompt = """
            Analyze this resume and return a structured report with:
            1. Overall Score (out of 100)
            2. Detected Skills (grouped by category)
            3. Strengths (3-4 points)
            4. Weaknesses (2-3 points)
            5. Missing In-Demand Skills
            6. Suitable Job Roles
            7. Improvement Tips

            Resume:
            %s
            """.formatted(resumeText);

        String body = """
            {"contents":[{"parts":[{"text":"%s"}]}]}
            """.formatted(prompt.replace("\"", "\\\"").replace("\n", "\\n"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", apiKey);

        String response = restTemplate.postForObject(url, new HttpEntity<>(body, headers), String.class);
        return response;
    }

    // ── Local smart analysis (no API key needed) ──────────────────────────────
    private String localAnalysis(String text) {
        String lower = text.toLowerCase();

        // Detect skills
        Map<String, List<String>> found = new LinkedHashMap<>();
        int totalSkills = 0;
        for (var entry : SKILL_CATEGORIES.entrySet()) {
            List<String> matched = entry.getValue().stream()
                .filter(lower::contains)
                .collect(Collectors.toList());
            if (!matched.isEmpty()) {
                found.put(entry.getKey(), matched);
                totalSkills += matched.size();
            }
        }

        // Missing in-demand skills
        List<String> missing = ALL_IN_DEMAND.stream()
            .filter(s -> !lower.contains(s))
            .limit(6)
            .collect(Collectors.toList());

        // Score calculation
        int baseScore = Math.min(40 + totalSkills * 4, 85);
        boolean hasExperience = lower.contains("experience") || lower.contains("worked") || lower.contains("years");
        boolean hasEducation  = lower.contains("university") || lower.contains("college") || lower.contains("bachelor") || lower.contains("degree") || lower.contains("b.tech") || lower.contains("b.e");
        boolean hasProjects   = lower.contains("project") || lower.contains("built") || lower.contains("developed") || lower.contains("created");
        boolean hasCerts      = lower.contains("certified") || lower.contains("certification") || lower.contains("certificate");
        if (hasExperience) baseScore = Math.min(baseScore + 5, 95);
        if (hasEducation)  baseScore = Math.min(baseScore + 3, 95);
        if (hasProjects)   baseScore = Math.min(baseScore + 4, 95);
        if (hasCerts)      baseScore = Math.min(baseScore + 3, 95);

        // Suitable roles
        List<String> roles = new ArrayList<>();
        if (found.containsKey("Frontend") || found.containsKey("Backend")) roles.add("Full Stack Developer");
        if (found.containsKey("Frontend")) roles.add("Frontend Developer");
        if (found.containsKey("Backend"))  roles.add("Backend Developer / Software Engineer");
        if (found.containsKey("AI & Data")) roles.add("Data Scientist / ML Engineer");
        if (found.containsKey("Cloud & DevOps")) roles.add("DevOps / Cloud Engineer");
        if (found.containsKey("Mobile"))   roles.add("Mobile App Developer");
        if (roles.isEmpty()) roles.add("Software Developer");

        // Build report
        StringBuilder sb = new StringBuilder();
        sb.append("╔══════════════════════════════════════════╗\n");
        sb.append("║       AI RESUME ANALYSIS REPORT          ║\n");
        sb.append("╚══════════════════════════════════════════╝\n\n");

        sb.append("📊 OVERALL SCORE: ").append(baseScore).append(" / 100\n");
        sb.append("═".repeat(45)).append("\n\n");

        sb.append("✅ DETECTED SKILLS (").append(totalSkills).append(" skills found)\n");
        sb.append("─".repeat(45)).append("\n");
        if (found.isEmpty()) {
            sb.append("⚠ No specific tech skills detected. Add skills section.\n");
        } else {
            for (var e : found.entrySet()) {
                sb.append("  ").append(e.getKey()).append(": ")
                  .append(String.join(", ", e.getValue())).append("\n");
            }
        }

        sb.append("\n💪 STRENGTHS\n").append("─".repeat(45)).append("\n");
        if (hasProjects)   sb.append("  ✔ Has project experience\n");
        if (hasExperience) sb.append("  ✔ Work experience mentioned\n");
        if (hasEducation)  sb.append("  ✔ Educational background present\n");
        if (hasCerts)      sb.append("  ✔ Certifications listed\n");
        if (totalSkills >= 5) sb.append("  ✔ Strong technical skill set (").append(totalSkills).append(" skills)\n");
        if (!found.isEmpty() && found.size() >= 3) sb.append("  ✔ Diverse technology exposure\n");

        sb.append("\n⚠ AREAS TO IMPROVE\n").append("─".repeat(45)).append("\n");
        if (!hasProjects)   sb.append("  ✘ Add project descriptions with outcomes\n");
        if (!hasExperience) sb.append("  ✘ Include work experience or internships\n");
        if (!hasCerts)      sb.append("  ✘ Add relevant certifications\n");
        if (totalSkills < 5) sb.append("  ✘ Expand your technical skills section\n");
        if (!lower.contains("github") && !lower.contains("linkedin"))
            sb.append("  ✘ Add GitHub and LinkedIn profile links\n");

        sb.append("\n🚀 IN-DEMAND SKILLS TO LEARN\n").append("─".repeat(45)).append("\n");
        missing.forEach(s -> sb.append("  → ").append(s).append("\n"));

        sb.append("\n🎯 SUITABLE JOB ROLES\n").append("─".repeat(45)).append("\n");
        roles.forEach(r -> sb.append("  ◆ ").append(r).append("\n"));

        sb.append("\n💡 TOP TIPS\n").append("─".repeat(45)).append("\n");
        sb.append("  1. Quantify achievements (e.g. 'Improved speed by 40%')\n");
        sb.append("  2. Keep resume to 1-2 pages maximum\n");
        sb.append("  3. Use action verbs: Built, Designed, Led, Optimised\n");
        sb.append("  4. Tailor resume keywords to match job descriptions\n");
        sb.append("  5. Add a brief professional summary at the top\n");

        sb.append("\n═".repeat(45)).append("\n");
        sb.append("Analysis powered by AI Job Portal • praveeng@demo.com\n");

        return sb.toString();
    }
}
