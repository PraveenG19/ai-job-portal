package com.aijobportal.backend.controller;

import java.net.MalformedURLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.aijobportal.backend.entity.Resume;
import com.aijobportal.backend.service.FileStorageService;
import com.aijobportal.backend.service.ResumeService;

import java.nio.file.Paths;
import java.nio.file.Path;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpHeaders;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute Resume resume) {

        String fileName = fileStorageService.uploadFile(file);

        resume.setFileName(fileName);
        resume.setFileType(file.getContentType());
        resume.setFilePath("uploads/" + fileName);

        return new ResponseEntity<>(
                resumeService.saveResume(resume),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public Resume getResume(@PathVariable Long id) {
        return resumeService.getResumeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return "Resume deleted successfully";
    }

    @GetMapping("/download/{id}")
public ResponseEntity<Resource> downloadResume(@PathVariable Long id) throws MalformedURLException {

    Resume resume = resumeService.getResumeById(id);

    Path path = Paths.get(resume.getFilePath());

    Resource resource = new UrlResource(path.toUri());

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + resume.getFileName() + "\"")
            .body(resource);
}
}