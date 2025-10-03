package com.prueba.back.business;

import com.prueba.back.dto.LoginRequest;
import com.prueba.back.dto.LoginResponse;
import com.prueba.back.dto.UserDTO;
import com.prueba.back.entity.User;
import com.prueba.back.service.UserService;
import com.prueba.back.utilities.auth.JwtUtil;
import com.prueba.back.utilities.mapStruct.UserMap;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthBusiness {
    private final UserService userService;

    private final JwtUtil jwtUtil = new JwtUtil(3000000);

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthBusiness(UserService userService) {
        this.userService = userService;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userService.getByUsername(loginRequest.getUsername());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getId(), user.getRole());
            UserDTO userDTO = UserMap.INSTANCE.toDTO(user);
            return new LoginResponse(token, userDTO);
        } else {
            return null;
        }
    }

}
