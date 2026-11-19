package com.aijobportal.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.aijobportal.backend.entity.User;
import com.aijobportal.backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = repository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        return new CustomUserDetails(user);
    }
}