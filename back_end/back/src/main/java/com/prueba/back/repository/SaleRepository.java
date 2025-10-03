package com.prueba.back.repository;

import com.prueba.back.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByPersonId(Long personId);
}
