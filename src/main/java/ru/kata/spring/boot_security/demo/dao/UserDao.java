package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {

    void addUser(User user);

    void updateUser(User user);

    List<User> listUsers();

    User getUserById(long id);

    void removeUser(User user);

    User getUserByLogin(String name);
}
