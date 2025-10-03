package com.prueba.back.dto.lighDTO;

import com.prueba.back.dto.PersonDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTOLight {
    private Long id;

    private Double totalAmount;

    private Integer itemCount;

    private PersonDTO person;

    private String date;

    private Boolean state;


}
