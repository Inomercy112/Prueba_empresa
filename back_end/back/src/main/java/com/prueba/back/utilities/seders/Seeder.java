package com.prueba.back.utilities.seders;

import com.prueba.back.entity.*;
import com.prueba.back.service.*;
import com.prueba.back.dto.UserDTO;
import com.prueba.back.business.UserBusiness;
import com.prueba.back.utilities.mapStruct.RoleMap;
import com.prueba.back.utilities.mapStruct.UserMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Component
public class Seeder {
    @Autowired
    private RoleService roleService;
    @Autowired
    private ProductService productService;
    @Autowired
    private PersonService personService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserBusiness userBusiness;

    @PostConstruct
    public void seed() {
        // Validar si la base de datos ya tiene datos
        boolean hasRoles = !roleService.getAll().isEmpty();
        boolean hasProducts = !productService.getAll().isEmpty();
        boolean hasPersons = !personService.getAll().isEmpty();
        boolean hasUsers = !userService.getAll().isEmpty();
        if (hasRoles || hasProducts || hasPersons || hasUsers) {
            return; // Ya hay datos, no ejecutar el seeder
        }

        // Roles
        Role userRole = new Role(null, "usuario", null);
        Role adminRole = new Role(null, "admin", null);
        userRole = roleService.save(userRole);
        adminRole = roleService.save(adminRole);

        // Productos
        List<Product> products = Arrays.asList(
            new Product(null, "Arepa", "Arepa de maíz blanca", null,2000.0, 100, true, null),
            new Product(null, "Bandeja Paisa", "Plato típico antioqueño",null, 25000.0, 50, true, null),
            new Product(null, "Ajiaco", "Sopa tradicional bogotana", null,18000.0, 40, true, null),
            new Product(null, "Empanada", "Empanada de carne",null, 1500.0, 200, true, null),
            new Product(null, "Pandebono", "Panecillo de queso",null, 1200.0, 150, true, null)
        );
        products.forEach(productService::save);

        // Personas y usuarios
        Person p1 = new Person(null, "Juan Pérez", "juan@mail.com", 12345678L, null, null);
        Person p2 = new Person(null, "María Gómez", "maria@mail.com", 87654321L, null, null);
        Person p3 = new Person(null, "Carlos Ruiz", "carlos@mail.com", 11223344L, null, null);
        Person p4 = new Person(null, "Ana Torres", "ana@mail.com", 44332211L, null, null);
        Person p5 = new Person(null, "Admin User", "admin@mail.com", 99999999L, null, null);
        p1 = personService.save(p1);
        p2 = personService.save(p2);
        p3 = personService.save(p3);
        p4 = personService.save(p4);
        p5 = personService.save(p5);

        // Obtener las personas gestionadas (sin asignarles usuario)
        p1 = personService.getById(p1.getId());
        p2 = personService.getById(p2.getId());
        p3 = personService.getById(p3.getId());
        p4 = personService.getById(p4.getId());
        p5 = personService.getById(p5.getId());

        // Crear usuarios para cada persona
        UserDTO u1 = new UserDTO(null, "juanperez", "1234", true, RoleMap.INSTANCE.toDTO(userRole), null);
        u1.setPerson(com.prueba.back.utilities.mapStruct.PersonMap.INSTANCE.toDTO(p1));
        UserDTO u2 = new UserDTO(null, "mariagomez", "1234", true, RoleMap.INSTANCE.toDTO(userRole), null);
        u2.setPerson(com.prueba.back.utilities.mapStruct.PersonMap.INSTANCE.toDTO(p2));
        UserDTO u3 = new UserDTO(null, "carlosruiz", "1234", true, RoleMap.INSTANCE.toDTO(userRole), null);
        u3.setPerson(com.prueba.back.utilities.mapStruct.PersonMap.INSTANCE.toDTO(p3));
        UserDTO u4 = new UserDTO(null, "anatorres", "1234", true, RoleMap.INSTANCE.toDTO(userRole), null);
        u4.setPerson(com.prueba.back.utilities.mapStruct.PersonMap.INSTANCE.toDTO(p4));
        UserDTO u5 = new UserDTO(null, "admin", "admin123", true, RoleMap.INSTANCE.toDTO(adminRole), null);
        u5.setPerson(com.prueba.back.utilities.mapStruct.PersonMap.INSTANCE.toDTO(p5));

        userBusiness.saveAllUsers(Arrays.asList(u1, u2, u3, u4, u5));
    }
}
