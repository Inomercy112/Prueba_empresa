package com.prueba.back.dto;

import com.prueba.back.entity.Product;
import com.prueba.back.entity.Sale;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSaleDTO {
    private Long id;
    private ProductDTO product;
    private SaleDTO sale;
    private Integer quantity;
    private Double actualPrice;
    private LocalDateTime createdAt;
}
