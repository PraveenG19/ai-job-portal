package com.aijobportal.backend.service;

import java.util.List;

import com.aijobportal.backend.entity.Company;
import com.aijobportal.backend.entity.User;

public interface CompanyService {

    Company saveCompany(Company company,User user);

    Company getCompanyById(Long id);

    List<Company> getAllCompanies();

    Company updateCompany(Long id, Company company);

    void deleteCompany(Long id);

}