package com.example.demo.repository;

import com.example.demo.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

	List<User> findByStatus(String string);
}
