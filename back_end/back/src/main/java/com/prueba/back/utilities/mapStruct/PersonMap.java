package com.prueba.back.utilities.mapStruct;

import com.prueba.back.dto.PersonDTO;
import com.prueba.back.entity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PersonMap {
    PersonMap INSTANCE = org.mapstruct.factory.Mappers.getMapper(PersonMap.class);

    PersonDTO toDTO(Person person);

    Person toEntity(PersonDTO personDTO);

    List<PersonDTO> toDTOList(List<Person> persons);

    void updateEntity(PersonDTO personDTO,@MappingTarget Person person);
}
