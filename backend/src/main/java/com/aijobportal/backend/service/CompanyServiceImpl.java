package com.aijobportal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.Company;
import com.aijobportal.backend.entity.User;
import com.aijobportal.backend.exception.ResourceNotFoundException;
import com.aijobportal.backend.repository.CompanyRepository;
import com.aijobportal.backend.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {


    @Autowired
    private CompanyRepository companyRepository;


    @Override
public Company saveCompany(Company company, User user) {

    company.setCreatedBy(user);

    return companyRepository.save(company);
}


    @Override
    public Company getCompanyById(Long id) {

        return companyRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Company not found with id: " + id
                    )
                );
    }


    @Override
    public List<Company> getAllCompanies() {

        return companyRepository.findAll();
    }


    @Override
    public Company updateCompany(Long id, Company company) {

        Company existingCompany = getCompanyById(id);

        existingCompany.setCompanyName(company.getCompanyName());
        existingCompany.setDescription(company.getDescription());
        existingCompany.setWebsite(company.getWebsite());
        existingCompany.setLocation(company.getLocation());
        existingCompany.setEmail(company.getEmail());
        existingCompany.setPhone(company.getPhone());
        existingCompany.setLogo(company.getLogo());

        return companyRepository.save(existingCompany);
    }


    @Override
    public void deleteCompany(Long id) {

        Company company = getCompanyById(id);

        companyRepository.delete(company);
    }
}