package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.ProductSaleDTO;
import com.prueba.back.dto.lighDTO.ProductSaleLightForSale;
import com.prueba.back.entity.ProductSale;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {PhotoMapper.class})
public interface ProductSaleMap {
    ProductSaleMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(ProductSaleMap.class);

    List<ProductSale> toEntityList(List<ProductSaleLightForSale> dtoList);

    List<ProductSaleDTO> toDtoList(List<ProductSale> entityList);

    ProductSale toEntity(ProductSaleDTO dto);

    ProductSaleDTO toDto(ProductSale entity);
}
