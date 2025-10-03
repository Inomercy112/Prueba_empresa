package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.RoleDTO;
import com.prueba.back.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMap {
    RoleMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(RoleMap.class);

    Role toEntity(RoleDTO roleDTO);
    RoleDTO toDTO(Role role);
    List<RoleDTO> toDTOs(List<Role> roles);
    List<Role> toEntities(List<RoleDTO> roleDTOs);
}

