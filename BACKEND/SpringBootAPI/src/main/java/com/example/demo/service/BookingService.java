
package com.example.demo.service;

import com.example.demo.dto.BookingRequest;
import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Booking;
import com.example.demo.entities.Event;
import com.example.demo.entities.User;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventService eventService;

    @Autowired 
    private UserService userService;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    public Booking createBookingWithRequest(BookingRequest bookingRequest) throws Exception {
        User user = userService.getUserById(bookingRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));

        Event event = eventService.getEventById(bookingRequest.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Event ID"));

        int availableSeats = event.getNoOfSeats();
        int requestedSeats = bookingRequest.getNoOfSeats();

        if (requestedSeats > availableSeats) {
            throw new IllegalArgumentException("Only " + availableSeats + " seats are available.");
        }

        event.setNoOfSeats(availableSeats - requestedSeats);

        Booking booking = new Booking();
        booking.setBookingDate(bookingRequest.getBookingDate());
        booking.setNoOfSeats(requestedSeats);
        booking.setPrice(bookingRequest.getPrice());
        booking.setTotalCost(bookingRequest.getTotalCost());
        booking.setUser(user);
        booking.setEvent(event);

        return bookingRepository.save(booking);
    }

    public Booking updateBookingWithRequest(int id, BookingRequest bookingRequest) throws Exception {
        if (!bookingRepository.existsById(id)) {
            throw new Exception("Booking not found with id " + id);
        }

        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new Exception("Booking not found with id " + id));

        User user = userService.getUserById(bookingRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));

        Event event = eventService.getEventById(bookingRequest.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Event ID"));

        existingBooking.setBookingDate(bookingRequest.getBookingDate());
        existingBooking.setNoOfSeats(bookingRequest.getNoOfSeats());
        existingBooking.setPrice(bookingRequest.getPrice());
        existingBooking.setTotalCost(bookingRequest.getTotalCost());
        existingBooking.setUser(user);
        existingBooking.setEvent(event);

        return bookingRepository.save(existingBooking);
    }

    public void deleteBooking(int id) throws Exception {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
        } else {
            throw new Exception("Booking with id " + id + " not found");
        }
    }
    
    public List<Booking> getBookingsByUserId(int userId) {
        return bookingRepository.findBookingsByUserId(userId);
    }
}
