package com.prueba.back.service;

import com.prueba.back.entity.Product;
import com.prueba.back.entity.Role;
import com.prueba.back.repository.ProductRepository;
import com.prueba.back.repository.RoleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public Role getById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    public Role getByName(String name) {
        return roleRepository.findByName(name);
    }

    public List<Role> getAll() {
        return roleRepository.findAll();
    }
}
