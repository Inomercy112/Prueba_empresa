package com.prueba.back.service;

import com.prueba.back.entity.ProductSale;
import com.prueba.back.entity.Sale;
import com.prueba.back.repository.ProductSaleRepository;
import com.prueba.back.repository.SaleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SaleService {
    private final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }
    public Sale save(Sale sale) {
        return saleRepository.save(sale);
    }

    public List<Sale> getByPersonId(Long personId) {
        return saleRepository.findByPersonId(personId);
    }

    public Sale getById(Long id) {
        return saleRepository.findById(id).orElse(null);
    }

    public Page<Sale> getAll(PageRequest pageRequest) {
        return  saleRepository.findAll(pageRequest);
    }

    public List<Sale> getAll() {
        return  saleRepository.findAll();
    }

    public void delete(Long id) {
        saleRepository.deleteById(id);
    }
}
