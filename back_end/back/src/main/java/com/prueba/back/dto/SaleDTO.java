package com.prueba.back.dto;

import com.prueba.back.dto.lighDTO.ProductSaleLightForSale;
import com.prueba.back.entity.Person;
import com.prueba.back.entity.ProductSale;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaleDTO {

    private Long id;

    private Double totalAmount;

    private Integer itemCount;

    private PersonDTO person;

    private String date;

    private Boolean state;

    private List<ProductSaleLightForSale> productSales;
}
