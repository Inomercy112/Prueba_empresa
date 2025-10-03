package com.prueba.back.dto;

import com.prueba.back.dto.lighDTO.ProductSaleLightForProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;

    private String description;
    private String image;
    private Double price;
    private Integer stock;
    private Boolean state;
    private List <ProductSaleLightForProduct> productSales;
}
