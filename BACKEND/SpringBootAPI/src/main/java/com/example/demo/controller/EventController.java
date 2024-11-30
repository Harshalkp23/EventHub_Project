//package com.example.demo.controller;
//
//import com.example.demo.dto.EventRequest;
//import com.example.demo.entities.Category;
//import com.example.demo.entities.Event;
//import com.example.demo.entities.User;
//import com.example.demo.service.CategoryService;
//import com.example.demo.service.EventService;
//import com.example.demo.service.UserService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//@CrossOrigin
//@RestController
//@RequestMapping("/events")
//public class EventController {
//
//    @Autowired
//    private EventService eventService;
//    
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private CategoryService categoryService;
//    @GetMapping
//    public List<Event> getAllEvents() {
//        return eventService.getAllEvents();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Event> getEventById(@PathVariable("id") int id) {
//        return eventService.getEventById(id)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
////    @PostMapping("/create")
////    public ResponseEntity<Void> createEvent(@RequestBody EventRequest eventRequest) {
////        eventService.createEventWithRequest(eventRequest);
////        return ResponseEntity.status(HttpStatus.CREATED).build();
////    }
//    @PostMapping("/create")
//    public Event createEvent(@RequestBody EventRequest eventRequest) {
//       return eventService.createEventWithRequest(eventRequest);
//        //return ResponseEntity.status(HttpStatus.CREATED).build();
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Event> updateEvent(@PathVariable int id, @RequestBody EventRequest eventRequest) throws Exception {
//        Event updatedEvent = eventService.updateEvent(id, eventRequest);
//        return ResponseEntity.ok(updatedEvent);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteEvent(@PathVariable int id) throws Exception {
//        eventService.deleteEvent(id);
//        return ResponseEntity.noContent().build();
//    }
//    
////    @GetMapping("/user/{userId}")
////    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable("userId") int userId) {
////        User user = userService.getUserById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));
////        List<Event> events = eventService.getEventsByUser(user);
////        return ResponseEntity.ok(events);
////    }
//
//    @GetMapping("/category/{catId}")
//    public ResponseEntity<List<Event>> getEventByCategoryId(@PathVariable("catId") int catId){
//    	Category category = categoryService.getCategoryById(catId).orElseThrow(()-> new IllegalArgumentException("Invalid Category ID"));
//    	List<Event> events = eventService.getEventsByCategory(category);
//    	return ResponseEntity.ok(events);
//    }
//    
//    @GetMapping("/category/name/{catName}")
//    public ResponseEntity<List<Event>> getEventsByCategoryName(@PathVariable("catName") String catName) {
//        List<Event> events = eventService.getEventsByCategoryName(catName);
//        return ResponseEntity.ok(events);
//    }
//
//    @GetMapping("/city/{city}")
//    public List<Event> getEventsByCity(@PathVariable String city) {
//        return eventService.getEventsByCity(city);
//    }
//    
////    @GetMapping("/date/{date}")
////    public ResponseEntity<List<Event>> getEventsByDate(@PathVariable String date) {
////        List<Event> events = eventService.getEventsByDate(date);
////        return ResponseEntity.ok(events);
////    }
//
//    @GetMapping("/search/{eventName}")
//    public ResponseEntity<List<Event>> searchEventsByName(@PathVariable String eventName) {
//        List<Event> events = eventService.searchEventsByName(eventName);
//        return ResponseEntity.ok(events);
//    }
//
//}
package com.example.demo.controller;

import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Category;
import com.example.demo.entities.Event;
import com.example.demo.service.CategoryService;
import com.example.demo.service.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getEventsByStatus("APPROVED");
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable("id") int id) {
        return eventService.getEventById(id)
                .filter(event -> "APPROVED".equals(event.getStatus()))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createEvent(@RequestBody EventRequest eventRequest) {
        eventService.createEventWithRequest(eventRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable int id, @RequestBody EventRequest eventRequest) {
        try {
            Event updatedEvent = eventService.updateEvent(id, eventRequest);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/category/{catId}")
    public ResponseEntity<List<Event>> getEventsByCategoryId(@PathVariable("catId") int catId) {
        Category category = categoryService.getCategoryById(catId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Category ID"));
        List<Event> events = eventService.getEventsByCategory(category);
        events.removeIf(event -> !"APPROVED".equals(event.getStatus()));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/category/name/{catName}")
    public ResponseEntity<List<Event>> getEventsByCategoryName(@PathVariable("catName") String catName) {
        List<Event> events = eventService.getEventsByCategoryName(catName);
        events.removeIf(event -> !"APPROVED".equals(event.getStatus()));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Event>> getEventsByCity(@PathVariable String city) {
        List<Event> events = eventService.getEventsByCity(city);
        events.removeIf(event -> !"APPROVED".equals(event.getStatus()));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        List<Event> events = eventService.getUpcomingEvents();
        events.removeIf(event -> !"APPROVED".equals(event.getStatus()));
        return ResponseEntity.ok(events);
    }

    @GetMapping("/search/{eventName}")
    public ResponseEntity<List<Event>> searchEventsByName(@PathVariable String eventName) {
        List<Event> events = eventService.searchEventsByName(eventName);
        events.removeIf(event -> !"APPROVED".equals(event.getStatus()));
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/status/pending")
    public ResponseEntity<List<Event>> getEventsByStatusPending() {
        List<Event> events = eventService.getEventsByStatusPending();
        return ResponseEntity.ok(events);
    }
}
