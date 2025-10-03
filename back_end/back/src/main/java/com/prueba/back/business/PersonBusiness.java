package com.prueba.back.business;

import com.prueba.back.dto.PersonDTO;
import com.prueba.back.entity.Person;
import com.prueba.back.service.PersonService;
import com.prueba.back.utilities.mapStruct.PersonMap;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class PersonBusiness {
    private final PersonService personService;

    public PersonBusiness(PersonService personService) {
        this.personService = personService;
    }


    public PersonDTO savePerson(PersonDTO personDTO){

        Person person = PersonMap.INSTANCE.toEntity(personDTO);
        Person savedPerson = personService.save(person);
        return PersonMap.INSTANCE.toDTO(savedPerson);
    }

    public PersonDTO getPersonById(String id){
        Long idLong = Long.parseLong(id);
        Person person = personService.getById(idLong);
        return PersonMap.INSTANCE.toDTO(person);
    }

    public List<PersonDTO> getAllPersons(){
        List<Person> persons = personService.getAll();
        return PersonMap.INSTANCE.toDTOList(persons);
    }
}
