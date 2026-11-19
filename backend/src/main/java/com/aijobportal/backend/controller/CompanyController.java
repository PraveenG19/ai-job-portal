package com.aijobportal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.aijobportal.backend.entity.Company;
import com.aijobportal.backend.entity.User;
import com.aijobportal.backend.security.CustomUserDetails;
import com.aijobportal.backend.service.CompanyService;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Create Company
    @PostMapping
    public ResponseEntity<Company> createCompany(
            @RequestBody Company company,
            Authentication authentication) {

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        User user = userDetails.getUser();

        Company savedCompany = companyService.saveCompany(company, user);

        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    // Get All Companies
    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );
    }

    // Get Company By Id
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );
    }

    // Update Company
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(
            @PathVariable Long id,
            @RequestBody Company company) {

        return ResponseEntity.ok(
                companyService.updateCompany(id, company)
        );
    }

    // Delete Company
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable Long id) {

        companyService.deleteCompany(id);

        return ResponseEntity.ok("Company deleted successfully");
    }
}