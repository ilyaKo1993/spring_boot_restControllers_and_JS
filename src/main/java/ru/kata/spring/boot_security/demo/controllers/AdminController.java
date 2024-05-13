package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import java.util.Set;

@Controller
public class AdminController {

    private UserServiceImpl userService;
    private RoleService roleService;


    @Autowired
    public void setUserService(UserServiceImpl userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String listUsers(@AuthenticationPrincipal User user,Model model) {
        model.addAttribute("user", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("listUser", userService.listUsers());
        return "users";
    }

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public String addUser(@ModelAttribute("user") User user, @RequestParam("role") String role) {
        user.setRoles(Set.of(roleService.getRoleByName(role)));
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/remove")
    public String removeUser(@RequestParam("id") Long id) {
        this.userService.removeUser(id);
        return "redirect:/admin";
    }

    @PostMapping("/update")
    public String updateUser(@ModelAttribute("user") User user, @RequestParam("role") String role) {
        user.setRoles(Set.of(roleService.getRoleByName(role)));
        userService.updateUser(user);
        return "redirect:/admin";
    }
}
