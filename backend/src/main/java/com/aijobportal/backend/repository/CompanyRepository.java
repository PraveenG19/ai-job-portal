package com.aijobportal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aijobportal.backend.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}