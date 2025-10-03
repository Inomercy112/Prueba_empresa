package com.prueba.back.repository;

import com.prueba.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
