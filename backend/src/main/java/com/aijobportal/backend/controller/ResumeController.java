package com.aijobportal.backend.controller;

import java.net.MalformedURLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.aijobportal.backend.entity.Resume;
import com.aijobportal.backend.entity.User;
import com.aijobportal.backend.security.CustomUserDetails;
import com.aijobportal.backend.service.FileStorageService;
import com.aijobportal.backend.service.ResumeService;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired private ResumeService      resumeService;
    @Autowired private FileStorageService fileStorageService;

    /** Upload resume — student is taken from JWT, no need to send in body */
    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        User student = ((CustomUserDetails) authentication.getPrincipal()).getUser();

        String fileName = fileStorageService.uploadFile(file);

        Resume resume = new Resume();
        resume.setFileName(fileName);
        resume.setFileType(file.getContentType());
        resume.setFilePath("uploads/" + fileName);
        resume.setStudent(student);

        return new ResponseEntity<>(resumeService.saveResume(resume), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Resume>> getAllResumes() {
        return ResponseEntity.ok(resumeService.getAllResumes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResumeById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.ok("Resume deleted successfully");
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id)
            throws MalformedURLException {
        Resume resume = resumeService.getResumeById(id);
        Path path = Paths.get(resume.getFilePath());
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resume.getFileName() + "\"")
                .body(resource);
    }
}
