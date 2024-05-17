package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
public class UserRestController {

    private UserService userService;
    private RoleService roleService;


    @Autowired
    public void setUserService(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping("/rest/users")
    public List<User> getUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/rest/roles")
    public List<Role> getRoles() {
        return roleService.getAllRoles();
    }


    @GetMapping("/rest/user/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/rest/user/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") int id) {
        userService.removeUser(userService.getUserById(id).getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rest/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/rest/edit_user/{id}")
    public ResponseEntity<User> editUser(@PathVariable("id") int id, @RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
        return ResponseEntity.ok().body(user);
    }
}