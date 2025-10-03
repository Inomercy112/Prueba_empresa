package com.prueba.back.dto.lighDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTOLight {
    private Long id;
    private String name;

    private String description;
    private String image;
    private Double price;
    private Integer stock;
    private Boolean state;

}
