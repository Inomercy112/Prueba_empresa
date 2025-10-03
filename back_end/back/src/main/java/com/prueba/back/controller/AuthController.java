package com.prueba.back.controller;

import com.prueba.back.business.AuthBusiness;
import com.prueba.back.dto.ControllerResponse;
import com.prueba.back.dto.LoginRequest;
import com.prueba.back.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthBusiness authBusiness;

    public AuthController(AuthBusiness authBusiness) {
        this.authBusiness = authBusiness;
    }

    @PostMapping("/login")
    public ControllerResponse login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authBusiness.login(loginRequest);
        if (response != null) {
            return new ControllerResponse("Login successful",response, 201 );
        } else {
            return new ControllerResponse("Invalid username or password", null, 401);
        }
    }

}
