package com.prueba.back.service;

import com.prueba.back.entity.Sale;
import com.prueba.back.entity.User;
import com.prueba.back.repository.SaleRepository;
import com.prueba.back.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User save(User user) {
        return userRepository.save(user);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> saveAll(List<User> users) {
        return userRepository.saveAll(users);
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Page<User> getAll(PageRequest pageRequest) {
        return  userRepository.findAll(pageRequest);
    }

    public List<User> getAll() {
        return  userRepository.findAll();
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}