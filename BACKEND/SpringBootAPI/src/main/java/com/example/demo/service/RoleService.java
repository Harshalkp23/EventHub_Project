package com.example.demo.service;

import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(int id) {
        return roleRepository.findById(id);
    }

    public void createRole(Role role) {
        roleRepository.save(role);
    }

    public Role updateRole(int id, Role role) {
        role.setRoleId(id);
        return roleRepository.save(role);
    }

    public void deleteRole(int id) {
        roleRepository.deleteById(id);
    }
    
    public Role createRoleFromRequest(EventRequest eventRequest) {
        Role role = new Role();
        role.setRoleId(eventRequest.getRoleId());
        role.setRoleName(eventRequest.getRoleName());
        return roleRepository.save(role);
    }
}
