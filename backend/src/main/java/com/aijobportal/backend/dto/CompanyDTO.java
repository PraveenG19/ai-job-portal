package com.aijobportal.backend.dto;

import lombok.Data;

@Data
public class CompanyDTO {

    private Long id;

    private String companyName;

    private String description;

    private String website;

    private String location;

    private String email;

    private String phone;

    private String logo;
}