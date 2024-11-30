package com.example.demo.service;

import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Category;
import com.example.demo.entities.Event;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(int id) {
        return categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(int id, Category category) {
        category.setCatId(id);
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
    
    public Category createCategoryFromRequest(EventRequest eventRequest) {
        Category category = new Category();
        category.setCatId(eventRequest.getCatId());
        category.setCatName(eventRequest.getCatName());
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryByName(String catName) {
        return categoryRepository.findByCatName(catName);
    }

}
