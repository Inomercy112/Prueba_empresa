package com.prueba.back.dto.lighDTO;

import com.prueba.back.dto.ProductDTO;
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
public class ProductSaleLightForSale {

    private Long id;
    private ProductDTOLight product;

    private Integer quantity;

    private Double actualPrice;

    private LocalDateTime createdAt;
}
