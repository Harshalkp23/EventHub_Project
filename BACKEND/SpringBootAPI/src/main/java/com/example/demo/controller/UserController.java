//package com.example.demo.controller;
//
//import com.example.demo.entities.User;
//import com.example.demo.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//	@Autowired
//	private UserService userService;
//
//	@GetMapping
//	public List<User> getAllUsers() {
//		return userService.getAllUsers();
//	}
//
//	@GetMapping("/{id}")
//	public Optional<User> getUserById(@PathVariable("id") Integer id) {
//		return userService.getUserById(id);
//	}
//
//	@PostMapping
//	public User createUser(@RequestBody User user) {
//		return userService.createUser(user);
//	}
//
//	@PutMapping("/{id}")
//	public User updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
//		return userService.updateUser(id, user);
//	}
//
//	@DeleteMapping("/{id}")
//	public void deleteUser(@PathVariable("id") Integer id) {
//		userService.deleteUser(id);
//	}
//}
package com.example.demo.controller;

import com.example.demo.entities.User; 
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/{id}")
	public Optional<User> getUserById(@PathVariable("id") Integer id) {
		return userService.getUserById(id);
	}

	@PostMapping("create")
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

	@PutMapping("/{id}")
	public User updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
		return userService.updateUser(id, user);
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable("id") Integer id) {
		userService.deleteUser(id);
	}



	@GetMapping("/pending")
	public ResponseEntity<List<User>> getPendingUsers() {
		List<User> pendingUsers = userService.getPendingUsers();
		return ResponseEntity.ok(pendingUsers);
	}

	@PutMapping("/{id}/approve")
	public ResponseEntity<User> approveUser(@PathVariable("id") Integer id) {
		try {
			User approvedUser = userService.approveUser(id);
			return ResponseEntity.ok(approvedUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@DeleteMapping("/{id}/decline")
	public ResponseEntity<Void> declineUser(@PathVariable("id") Integer id) {
		try {
			userService.declineUser(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}

