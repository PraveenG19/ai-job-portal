package com.aijobportal.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Forwards all non-API, non-static requests to index.html
 * so React Router can handle client-side navigation.
 */
@Controller
public class SpaController {

    @RequestMapping(value = {
        "/",
        "/login",
        "/register",
        "/jobs",
        "/jobs/**",
        "/companies",
        "/student-dashboard",
        "/hr-dashboard",
        "/admin-dashboard",
        "/application",
        "/saved-jobs",
        "/resume",
        "/resume-upload",
        "/profile",
        "/apply-job/**",
        "/create-job",
        "/edit-job/**",
        "/applicants",
        "/manage-users",
        "/manage-jobs",
        "/analytics",
        "/ai-resume-analyzer"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
