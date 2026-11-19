package com.aijobportal.backend.service;

import java.util.List;

import com.aijobportal.backend.entity.User;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);

    User findByEmail(String email);

    void deleteUser(Long id);

}