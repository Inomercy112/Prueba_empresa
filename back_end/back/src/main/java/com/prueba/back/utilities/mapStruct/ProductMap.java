package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.ProductDTO;
import com.prueba.back.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy =  org.mapstruct.NullValuePropertyMappingStrategy.IGNORE, uses = {PhotoMapper.class})
public interface ProductMap {
    ProductMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(ProductMap.class);
    ProductDTO toDTO(Product product);
    Product toEntity(ProductDTO productDTO);
    List<ProductDTO> toDTOs(List<Product> products);
    void updateEntityFromDTO(ProductDTO productDTO, @MappingTarget Product product);

}
