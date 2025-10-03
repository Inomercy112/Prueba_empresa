package com.prueba.back.business;

import com.prueba.back.dto.UserDTO;
import com.prueba.back.entity.Person;
import com.prueba.back.entity.Role;
import com.prueba.back.entity.User;
import com.prueba.back.service.PersonService;
import com.prueba.back.service.RoleService;
import com.prueba.back.service.UserService;

import com.prueba.back.utilities.mapStruct.PersonMap;
import com.prueba.back.utilities.mapStruct.UserMap;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserBusiness {
    private final UserService userService;

    private final RoleService roleService;
    private final PersonService personService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public UserBusiness(UserService userService, RoleService roleService, PersonService personService) {
        this.userService = userService;
        this.roleService = roleService;
        this.personService = personService;
    }

    public UserDTO saveUser(UserDTO userDTO) {
            User user = UserMap.INSTANCE.toEntity(userDTO);
            Role role = roleService.getById(userDTO.getRole().getId());
            String hashedPassword =  passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            user.setRole(role);
            User savedUser = userService.save(user);
            return UserMap.INSTANCE.toDTO(savedUser);
    }

    public UserDTO savePersonUser(UserDTO userDTO) {
        Person person = new Person();
        person.setName(userDTO.getUsername());
        Person savedPerson = personService.save(person);
        User user = new User();
        user.setUsername(userDTO.getUsername());
        String hashedPassword =  passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(hashedPassword);
        user.setPerson(savedPerson);
        user.setState(true);
        Role role = roleService.getByName("usuario");
        user.setRole(role);
        return UserMap.INSTANCE.toDTO(userService.save(user));
    }

    public void saveAllUsers(List<UserDTO> userDTOs) {
        List<User> users = UserMap.INSTANCE.toEntities(userDTOs);
        for (User user : users) {
            String hashedPassword =  passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
        }
        List<User> savedUsers = userService.saveAll(users);
        UserMap.INSTANCE.toDTOs(savedUsers);
    }

    public UserDTO getUserById(String id) {
        Long idLong = Long.parseLong(id);
        User user = userService.getById(idLong);
        return UserMap.INSTANCE.toDTO(user);
    }


    public UserDTO updateUser(UserDTO userDTO, Long id) {
        userDTO.setId(id);
        User user = userService.getById(id);
        UserMap.INSTANCE.updateEntity(userDTO, user);
            if(userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                String hashedPassword =  passwordEncoder.encode(userDTO.getPassword());
                user.setPassword(hashedPassword);
            }
        User updatedUser = userService.save(user);
        return UserMap.INSTANCE.toDTO(updatedUser);
    }

    public UserDTO updateUserState(Long id, UserDTO userDTO){
        Boolean state = userDTO.getState();

        User user = userService.getById(id);
        user.setState(state);
        User updatedUser = userService.save(user);
        return UserMap.INSTANCE.toDTO(updatedUser);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userService.getAll();
        return UserMap.INSTANCE.toDTOs(users);
    }


    public void deleteUser(String id) {
        Long idLong = Long.parseLong(id);
        userService.delete(idLong);
    }





}
