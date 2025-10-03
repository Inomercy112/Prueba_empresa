package com.prueba.back.controller;

import com.prueba.back.business.UserBusiness;
import com.prueba.back.dto.ControllerResponse;
import com.prueba.back.dto.UserDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserBusiness userBusiness;

    public UserController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    @PostMapping("/add")
    public ControllerResponse addUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userBusiness.saveUser(userDTO);
        return new ControllerResponse("User created successfully", savedUser, 201);
    }
    @PostMapping("/add/person")
    public ControllerResponse addPersonUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userBusiness.savePersonUser(userDTO);
        return new ControllerResponse("Person user created successfully", savedUser, 201);
    }

    @GetMapping("/get/{id}")
    public ControllerResponse getUser(@PathVariable String id) {
        UserDTO userDTO = userBusiness.getUserById(id);
        if(userDTO == null) {
            return new ControllerResponse("User not found", null, 404);
        }
        return new ControllerResponse("User retrieved successfully", userDTO, 200);
    }
    @GetMapping("/get/all")
    public ControllerResponse getAllUsers() {
        List<UserDTO> users = userBusiness.getAllUsers();
        return new ControllerResponse("Users retrieved successfully", users,200);
    }

    @PutMapping("/update/{id}")
    public ControllerResponse updateUser(@RequestBody UserDTO userDTO, @PathVariable  Long id) {
        UserDTO updatedUser = userBusiness.updateUser(userDTO, id);
        return new ControllerResponse("User updated successfully", updatedUser, 200);
    }

    @PatchMapping("/{id}/state")
    public ControllerResponse updateUserState(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userBusiness.updateUserState(id, userDTO);
        return new ControllerResponse("User state updated successfully", updatedUser, 200);
    }

    @DeleteMapping("/delete/{id}")
    public ControllerResponse deleteUser( @PathVariable String id) {
        userBusiness.deleteUser(id);
        return new ControllerResponse("User deleted successfully", null, 200);
    }

}
