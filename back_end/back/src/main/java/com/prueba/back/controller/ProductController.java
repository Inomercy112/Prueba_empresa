package com.prueba.back.controller;

import com.prueba.back.business.ProductBusiness;
import com.prueba.back.dto.ControllerResponse;
import com.prueba.back.dto.ProductDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/products")
@RestController
public class ProductController {
    private final ProductBusiness productBusiness;

    public ProductController(ProductBusiness productBusiness) {
        this.productBusiness = productBusiness;
    }

    @PostMapping("/add")
    public ControllerResponse addProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO product = productBusiness.createProduct(productDTO);
        return new ControllerResponse("Product created successfully", product, 201);
    }

    @GetMapping("/get/all")
    public ControllerResponse getAllProducts() {
        System.out.println("Fetching all products");
        List<ProductDTO> products = productBusiness.getAllProducts();
        return new ControllerResponse("Products retrieved successfully", products, 200);

    }

    @PatchMapping("/{id}/state")
    public ControllerResponse changeProductState(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productBusiness.changeProductState(id, productDTO);
        if (updatedProduct == null) {
            return new ControllerResponse("Product not found", null, 404);
        }
        return new ControllerResponse("Product state updated successfully", updatedProduct, 200);
    }


    @PutMapping("/edit/{id}")
    public ControllerResponse editProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productBusiness.editProduct(id, productDTO);
        if (updatedProduct == null) {
            return new ControllerResponse("Product not found", null, 404);
        }
        return new ControllerResponse("Product updated successfully", updatedProduct, 200);
    }

    @DeleteMapping("/delete/{id}")
    public ControllerResponse deleteProduct(@PathVariable Long id) {
        boolean isDeleted = productBusiness.deleteProduct(id);
        if (!isDeleted) {
            return new ControllerResponse("Product cannot be deleted", null, 400);
        } else {
            return new ControllerResponse("Product deleted successfully", null, 200);
        }
    }
}