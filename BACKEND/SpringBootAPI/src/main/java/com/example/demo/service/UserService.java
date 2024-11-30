package com.example.demo.service;

import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleService roleService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        if (user.getRole().getRoleId() == 2) {
            user.setStatus("PENDING");
        } else {
            user.setStatus("APPROVED");
        }
        return userRepository.save(user);
    }

    public User updateUser(int id, User user) {
        user.setUserId(id);
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User createUserFromRequest(EventRequest eventRequest) {
        User user = new User();
        
        Role role = roleService.getRoleById(eventRequest.getRid())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Role ID"));

        user.setUserId(eventRequest.getUserId());
        user.setUserName(eventRequest.getUserName());
        user.setPassword(eventRequest.getPassword());
        user.setFname(eventRequest.getFname());
        user.setLname(eventRequest.getLname());
        user.setAadharNo(eventRequest.getAadharNo());
        user.setDob(eventRequest.getDob());
        user.setEmail(eventRequest.getEmail());
        user.setPincode(eventRequest.getPincode());
        user.setAddress(eventRequest.getAddress());
        user.setMobileNo(eventRequest.getMobileNo());

        if (!isUserAtLeast18YearsOld(user.getDob())) {
            throw new IllegalArgumentException("User must be at least 18 years old.");
        }

        if (role.getRoleId() == 2) {
            user.setStatus("PENDING");
        } else {
            user.setStatus("APPROVED");
        }
        
        user.setRole(role);
        return userRepository.save(user);
    }
    private boolean isUserAtLeast18YearsOld(LocalDate dob) {
        if (dob == null) {
            return false;
        }
        LocalDate today = LocalDate.now();
        int age = Period.between(dob, today).getYears();
        return age >= 18;
    }

    public List<User> getPendingUsers() {
        return userRepository.findByStatus("PENDING");
    }

    public User approveUser(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));
        user.setStatus("APPROVED");
        return userRepository.save(user);
    }

    public void declineUser(int id) {
        userRepository.deleteById(id);
    }
}
