package com.aijobportal.backend.config;

import com.aijobportal.backend.entity.Company;
import com.aijobportal.backend.entity.Job;
import com.aijobportal.backend.repository.CompanyRepository;
import com.aijobportal.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private CompanyRepository companyRepository;
    @Autowired private JobRepository     jobRepository;

    @Override
    public void run(String... args) {
        if (companyRepository.count() > 0) return; // already seeded

        // ── Companies ────────────────────────────────────────────────────────
        Company google = company("Google",
            "World's leading search engine and cloud platform.",
            "https://google.com", "Mountain View, CA",
            "careers@google.com", "+1-650-253-0000",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png");

        Company microsoft = company("Microsoft",
            "Global leader in software, services, and cloud computing.",
            "https://microsoft.com", "Redmond, WA",
            "careers@microsoft.com", "+1-425-882-8080",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/320px-Microsoft_logo.svg.png");

        Company amazon = company("Amazon",
            "E-commerce and cloud computing giant — AWS powers the internet.",
            "https://amazon.com", "Seattle, WA",
            "careers@amazon.com", "+1-206-266-1000",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png");

        Company infosys = company("Infosys",
            "Leading Indian multinational IT services and consulting company.",
            "https://infosys.com", "Bengaluru, India",
            "careers@infosys.com", "+91-80-2852-0261",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/320px-Infosys_logo.svg.png");

        Company tcs = company("Tata Consultancy Services",
            "India's largest IT services company and global digital powerhouse.",
            "https://tcs.com", "Mumbai, India",
            "careers@tcs.com", "+91-22-6778-9999",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/320px-Tata_Consultancy_Services_Logo.svg.png");

        Company wipro = company("Wipro",
            "Global IT, consulting and business process services company.",
            "https://wipro.com", "Bengaluru, India",
            "careers@wipro.com", "+91-80-2844-0011",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/320px-Wipro_Primary_Logo_Color_RGB.svg.png");

        // ── Jobs ─────────────────────────────────────────────────────────────
        job("Software Engineer", "Design and develop scalable backend services using Java and Spring Boot.",
            "Mountain View, CA", "120000", "2+ years", "Full-time", google);

        job("Frontend Developer", "Build stunning React.js UIs with a focus on performance and accessibility.",
            "Redmond, WA", "110000", "1+ years", "Full-time", microsoft);

        job("Cloud Architect", "Architect and deploy enterprise solutions on AWS with high availability.",
            "Seattle, WA", "150000", "5+ years", "Full-time", amazon);

        job("Java Developer", "Develop enterprise Java applications for banking and finance clients.",
            "Bengaluru, India", "900000", "2+ years", "Full-time", infosys);

        job("DevOps Engineer", "Automate CI/CD pipelines and manage Kubernetes clusters at scale.",
            "Mumbai, India", "1200000", "3+ years", "Full-time", tcs);

        job("AI/ML Engineer", "Build machine learning models and deploy them to production.",
            "Bengaluru, India", "1500000", "2+ years", "Full-time", wipro);

        job("Android Developer", "Develop Android applications with Kotlin and Jetpack Compose.",
            "Mountain View, CA", "130000", "2+ years", "Full-time", google);

        job("Data Scientist", "Analyse large datasets and build predictive models using Python.",
            "Seattle, WA", "140000", "3+ years", "Full-time", amazon);

        job("Full Stack Developer", "Work on both frontend (React) and backend (Node/Java) systems.",
            "Bengaluru, India", "1000000", "2+ years", "Full-time", infosys);

        job("UI/UX Designer", "Design beautiful interfaces and conduct user research.",
            "Redmond, WA", "95000", "1+ years", "Full-time", microsoft);
    }

    private Company company(String name, String desc, String website,
                             String location, String email, String phone, String logo) {
        Company c = new Company();
        c.setCompanyName(name);
        c.setDescription(desc);
        c.setWebsite(website);
        c.setLocation(location);
        c.setEmail(email);
        c.setPhone(phone);
        c.setLogo(logo);
        return companyRepository.save(c);
    }

    private void job(String title, String desc, String location,
                     String salary, String exp, String type, Company company) {
        Job j = new Job();
        j.setTitle(title);
        j.setDescription(desc);
        j.setLocation(location);
        j.setSalary(salary);
        j.setExperience(exp);
        j.setJobType(type);
        j.setCompany(company);
        jobRepository.save(j);
    }
}
