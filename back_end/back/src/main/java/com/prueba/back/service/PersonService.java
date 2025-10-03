package com.prueba.back.service;

import com.prueba.back.entity.Person;
import com.prueba.back.repository.PersonRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }
    public Person save(Person person) {
        return personRepository.save(person);
    }

    public Person getById(Long id) {
        return personRepository.findById(id).orElse(null);
    }

    public Page<Person> getAll(PageRequest pageRequest) {
        return  personRepository.findAll(pageRequest);
    }

    public List<Person> getAll() {
        return  personRepository.findAll();
    }

    public void delete(Long id) {
        personRepository.deleteById(id);
    }

}
