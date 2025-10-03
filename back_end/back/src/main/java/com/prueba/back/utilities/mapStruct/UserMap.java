package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.UserDTO;
import com.prueba.back.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMap {
    UserMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(UserMap.class);

    User toEntity(UserDTO userDTO);

    UserDTO toDTO(User user);

    List<UserDTO> toDTOs(List<User> users);

    List<User> toEntities(List<UserDTO> userDTOs);

    void updateEntity(UserDTO userDTO, @MappingTarget User user);


}
