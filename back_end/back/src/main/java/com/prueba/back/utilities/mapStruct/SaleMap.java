package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.SaleDTO;
import com.prueba.back.entity.Sale;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {PhotoMapper.class})
public interface SaleMap {
    SaleMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(SaleMap.class);

    SaleDTO toDTO(Sale sale);

    Sale toEntity(SaleDTO saleDTO);

    List<SaleDTO> toDTOList(List<Sale> sales);
}
