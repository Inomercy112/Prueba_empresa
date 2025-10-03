package com.prueba.back.business;

import com.prueba.back.dto.ProductDTO;
import com.prueba.back.entity.Product;
import com.prueba.back.service.ProductService;
import com.prueba.back.utilities.mapStruct.ProductMap;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductBusiness {
    private final ProductService productService;

    public ProductBusiness(ProductService productService) {
        this.productService = productService;
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product productToSave = ProductMap.INSTANCE.toEntity(productDTO);
        Product product = productService.save(productToSave);
        return ProductMap.INSTANCE.toDTO(product);
    }
    public List<ProductDTO> getAllProducts() {
            List<Product> products = productService.getAll();
            return ProductMap.INSTANCE.toDTOs(products);

    }

    public ProductDTO editProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productService.getById(id);
        if (existingProduct == null) {
            return null;
        }
        ProductMap.INSTANCE.updateEntityFromDTO(productDTO, existingProduct);
        Product updatedProduct = productService.save(existingProduct);
        return ProductMap.INSTANCE.toDTO(updatedProduct);
    }
    public ProductDTO changeProductState(Long id, ProductDTO productDTO) {
        Product existingProduct = productService.getById(id);
        if (existingProduct == null) {
            return null;
        }
        existingProduct.setState(productDTO.getState());
        Product updatedProduct = productService.save(existingProduct);
        return ProductMap.INSTANCE.toDTO(updatedProduct);
    }


    public boolean deleteProduct(Long id) {
        Product existingProduct = productService.getById(id);
        if (existingProduct == null) {
            return false;
        }
        if (existingProduct.getStock() != null && existingProduct.getStock() > 0) {
            return false;
        }
        if (existingProduct.getProductSales() != null && !existingProduct.getProductSales().isEmpty()) {
            return false;
        }
        productService.delete(id);
        return true;
    }

}
