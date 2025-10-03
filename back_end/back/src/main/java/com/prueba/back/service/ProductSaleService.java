package com.prueba.back.service;

import com.prueba.back.entity.ProductSale;
import com.prueba.back.repository.ProductSaleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSaleService {
    private final ProductSaleRepository productSaleRepository;

    public ProductSaleService(ProductSaleRepository productSaleRepository) {
        this.productSaleRepository = productSaleRepository;
    }
    public ProductSale save(ProductSale productSale) {
        return productSaleRepository.save(productSale);
    }

    public void saveAll(List<ProductSale> productSales) {
        productSaleRepository.saveAll(productSales);
    }

    public ProductSale getById(Long id) {
        return productSaleRepository.findById(id).orElse(null);
    }

    public Page<ProductSale> getAll(PageRequest pageRequest) {
        return  productSaleRepository.findAll(pageRequest);
    }

    public List<ProductSale> getAll() {
        return  productSaleRepository.findAll();
    }

    public void delete(Long id) {
        productSaleRepository.deleteById(id);
    }
}
