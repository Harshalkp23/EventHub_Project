package com.example.demo.repository;

import com.example.demo.entities.Category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	  Optional<Category> findByCatName(String catName);
}
