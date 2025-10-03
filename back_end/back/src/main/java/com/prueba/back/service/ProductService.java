package com.prueba.back.service;

import com.prueba.back.entity.Product;
import com.prueba.back.entity.ProductSale;
import com.prueba.back.repository.ProductRepository;
import com.prueba.back.repository.ProductSaleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Page<Product> getAll(PageRequest pageRequest) {
        return  productRepository.findAll(pageRequest);
    }

    public List<Product> getAllByIds(List<Product> products) {
        List<Long> ids = products.stream().map(Product::getId).toList();
        return productRepository.findAllById(ids);
    }

    public List<Product> getAll() {
        return  productRepository.findAll();
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
