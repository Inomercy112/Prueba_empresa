package com.prueba.back.controller;

import com.prueba.back.business.SaleBusiness;
import com.prueba.back.dto.ControllerResponse;
import com.prueba.back.dto.SaleDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sales")
public class SaleController {
    private final SaleBusiness saleBusiness;

    public SaleController(SaleBusiness saleBusiness) {
        this.saleBusiness = saleBusiness;
    }

    @PostMapping("/add")
    public ControllerResponse createSale(@RequestBody SaleDTO saleDTO) {
        SaleDTO createdSale = saleBusiness.createSale(saleDTO);
        return new ControllerResponse("Sale created successfully", createdSale, 201);
    }
    @GetMapping("/get/all")
    public ControllerResponse getAllSales() {
        return new ControllerResponse("Sales retrieved successfully", saleBusiness.getAllSales(), 200);
    }
    @GetMapping("/get/person/{id}")
    public ControllerResponse getSalesByPersonId(@PathVariable Long id) {
        return new ControllerResponse("Sales retrieved successfully", saleBusiness.getSalesByPersonId(id), 200);
    }
}
