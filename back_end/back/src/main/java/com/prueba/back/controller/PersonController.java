package com.prueba.back.controller;

import com.prueba.back.business.PersonBusiness;
import com.prueba.back.dto.ControllerResponse;
import com.prueba.back.dto.PersonDTO;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/person")
@RestController
public class PersonController {
    private final PersonBusiness personBusiness;
    public PersonController(PersonBusiness personBusiness) {
        this.personBusiness = personBusiness;
    }
    @PostMapping("/add")
    public ControllerResponse addPerson(@RequestBody PersonDTO personDTO){
        PersonDTO savedPerson = personBusiness.savePerson(personDTO);
        return new ControllerResponse("Person saved successfully", savedPerson, 201);

    }
    @GetMapping("/all")
    public ControllerResponse getAllPersons(){
        List<PersonDTO> persons = personBusiness.getAllPersons();
        return new ControllerResponse("Persons retrieved successfully", persons, 200);

    }
    @GetMapping("/get/{id}")
    public ControllerResponse getPersonById(@PathVariable String id){
        PersonDTO personDTO = personBusiness.getPersonById(id);
        if(personDTO == null){
            return new ControllerResponse("Person not found", null, 404);
        }
        return new ControllerResponse("Person retrieved successfully", personDTO, 200);
    }
}
