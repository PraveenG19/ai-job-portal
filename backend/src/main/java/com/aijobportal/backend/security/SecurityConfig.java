package com.aijobportal.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
public class SecurityConfig {

    @Autowired private JwtAuthenticationFilter    jwtFilter;
    @Autowired private JwtAuthenticationEntryPoint entryPoint;

    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**")
                .disable())

            .headers(h -> h
                .frameOptions(f -> f.sameOrigin()))   // needed for H2 console

            .cors(cors -> {})

            .exceptionHandling(ex -> ex.authenticationEntryPoint(entryPoint))

            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // ── SPA pages & static assets ──────────────────────────────
                .requestMatchers(
                    "/", "/index.html",
                    "/login", "/register",
                    "/jobs", "/jobs/**",
                    "/companies",
                    "/student-dashboard", "/hr-dashboard", "/admin-dashboard",
                    "/application", "/saved-jobs", "/resume", "/resume-upload",
                    "/profile", "/apply-job/**", "/create-job", "/edit-job/**",
                    "/applicants", "/manage-users", "/manage-jobs",
                    "/analytics", "/ai-resume-analyzer",
                    "/assets/**", "/*.js", "/*.css", "/*.svg", "/*.ico", "/*.png",
                    "/h2-console/**"
                ).permitAll()

                // ── Public API ──────────────────────────────────────────────
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/company/**").permitAll()

                // ── Swagger ─────────────────────────────────────────────────
                .requestMatchers(
                    "/v3/api-docs/**", "/swagger-ui/**",
                    "/swagger-ui.html", "/api-docs/**"
                ).permitAll()

                // ── HR / Admin only ─────────────────────────────────────────
                .requestMatchers(HttpMethod.POST,   "/api/jobs/**").hasAnyRole("ADMIN","HR")
                .requestMatchers(HttpMethod.PUT,    "/api/jobs/**").hasAnyRole("ADMIN","HR")
                .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").hasAnyRole("ADMIN","HR")
                .requestMatchers(HttpMethod.POST,   "/api/company/**").hasAnyRole("ADMIN","HR")
                .requestMatchers(HttpMethod.PUT,    "/api/company/**").hasAnyRole("ADMIN","HR")
                .requestMatchers(HttpMethod.DELETE, "/api/company/**").hasAnyRole("ADMIN","HR")

                // ── Student only ────────────────────────────────────────────
                .requestMatchers("/api/applications/**").hasRole("STUDENT")
                .requestMatchers("/api/resumes/**").hasRole("STUDENT")
                .requestMatchers("/api/gemini/**").hasRole("STUDENT")
                .requestMatchers("/api/saved-jobs/**").hasRole("STUDENT")
                .requestMatchers("/api/ai/**").hasRole("STUDENT")

                .anyRequest().authenticated()
            )

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
