
package com.example.demo.controller;

import com.example.demo.dto.BookingRequest;
import com.example.demo.entities.Booking;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable("id") int id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest) throws Exception {
        System.out.println("Received BookingRequest: " + bookingRequest);
        Booking booking = bookingService.createBookingWithRequest(bookingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable int id, @RequestBody BookingRequest bookingRequest) throws Exception {
        Booking updatedBooking = bookingService.updateBookingWithRequest(id, bookingRequest);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) throws Exception {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable("userId") int userId) {
        return bookingService.getBookingsByUserId(userId);
    }

}

