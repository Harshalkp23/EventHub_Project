package com.example.demo.controller;

import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import com.example.demo.service.EventService;
import com.example.demo.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    // Event-related Endpoints
    @PutMapping("/events/{id}/approve")
    public ResponseEntity<Event> approveEvent(@PathVariable("id") int id) {
        try {
            Event approvedEvent = eventService.approveEvent(id);
            return ResponseEntity.ok(approvedEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/events/{id}/decline")
    public ResponseEntity<Void> declineEvent(@PathVariable("id") int id) {
        try {
            boolean isDeclined = eventService.declineEvent(id);
            if (isDeclined) {
                return ResponseEntity.noContent().build(); // Return 204 No Content if successful
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if the event was not found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 Internal Server Error for unexpected exceptions
        }
    }

    @GetMapping("/events/pending")
    public ResponseEntity<List<Event>> getPendingEvents() {
        try {
            List<Event> pendingEvents = eventService.getEventsByStatus("PENDING");
            return ResponseEntity.ok(pendingEvents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // User-related Endpoints
    @GetMapping("/users/pending")
    public ResponseEntity<List<User>> getPendingUsers() {
        try {
            List<User> pendingUsers = userService.getPendingUsers();
            return ResponseEntity.ok(pendingUsers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<User> approveUser(@PathVariable("id") int id) {
        try {
            User approvedUser = userService.approveUser(id);
            return ResponseEntity.ok(approvedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/users/{id}/decline")
    public ResponseEntity<Void> declineUser(@PathVariable("id") int id) {
        try {
            userService.declineUser(id);
            return ResponseEntity.noContent().build(); // Return 204 No Content if successful
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if the user was not found
        }
    }
}
