
package com.example.demo.service;

import com.example.demo.dto.EventRequest;
import com.example.demo.entities.Event;
import com.example.demo.entities.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findByStatus("APPROVED");
    }

    public Optional<Event> getEventById(int id) {
        return eventRepository.findById(id).filter(event -> "APPROVED".equals(event.getStatus()));
    }

    public Event createEventWithRequest(EventRequest eventRequest) {
        validateEventRequest(eventRequest);

        Category category = categoryService.getCategoryById(eventRequest.getCatId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Category ID"));

        Event event = new Event();
        event.setEventId(eventRequest.getEventId());
        event.setEventName(eventRequest.getEventName());
        event.setDescription(eventRequest.getDescription());
        event.setDate(eventRequest.getDate());
        event.setPrice(eventRequest.getPrice());
        event.setAddress(eventRequest.getAddress());
        event.setCity(eventRequest.getCity());
        event.setPincode(eventRequest.getPincode());
        event.setNoOfSeats(eventRequest.getNoOfSeats());
        event.setCategory(category);
        event.setStatus("PENDING");

        return eventRepository.save(event);
    }

    public Event updateEvent(int id, EventRequest eventRequest) throws Exception {
        validateEventRequest(eventRequest);

        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setEventName(eventRequest.getEventName());
            event.setDescription(eventRequest.getDescription());
            event.setDate(eventRequest.getDate());
            event.setPrice(eventRequest.getPrice());
            event.setAddress(eventRequest.getAddress());
            event.setCity(eventRequest.getCity());
            event.setPincode(eventRequest.getPincode());
            event.setNoOfSeats(eventRequest.getNoOfSeats());

            if (eventRequest.getCatId() != 0) {
                Category category = categoryRepository.findById(eventRequest.getCatId()).orElse(null);
                event.setCategory(category);
            }

            return eventRepository.save(event);
        } else {
            throw new Exception("Event not found with id " + id);
        }
    }

    public void deleteEvent(int id) throws Exception {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
        } else {
            throw new Exception("Event with id " + id + " not found");
        }
    }

    public List<Event> getEventsByCategory(Category category) {
        return eventRepository.findByCategoryAndStatus(category, "APPROVED");
    }

    public List<Event> getEventsByCategoryName(String catName) {
        return eventRepository.findByCategory_CatNameAndStatus(catName, "APPROVED");
    }

    public List<Event> getEventsByCity(String city) {
        return eventRepository.findByCityAndStatus(city, "APPROVED");
    }

    public List<Event> getUpcomingEvents() {
        Date currentDate = Date.valueOf(LocalDate.now());
        return eventRepository.findUpcomingEvents(currentDate).stream()
                .filter(event -> "APPROVED".equals(event.getStatus()))
                .toList();
    }

    public List<Event> searchEventsByName(String eventName) {
        return eventRepository.findByEventNameContainingAndStatus(eventName, "APPROVED");
    }

    public List<Event> getEventsByStatus(String status) {
        return eventRepository.findByStatus(status);
    }

    public List<Event> getEventsByStatusPending() {
        return eventRepository.findByStatus("PENDING");
    }

    public List<Event> approveEventsByStatus(String status) {
        List<Event> events = eventRepository.findByStatus(status);
        for (Event event : events) {
            event.setStatus("APPROVED");
            eventRepository.save(event);
        }
        return events;
    }

    public List<Event> declineEventsByStatus(String status) {
        List<Event> events = eventRepository.findByStatus(status);
        eventRepository.deleteAll(events);
        return events;
    }

    public Event approveEvent(int id) throws Exception {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            if ("PENDING".equals(event.getStatus())) {
                event.setStatus("APPROVED");
                return eventRepository.save(event);
            } else {
                throw new Exception("Event is not in PENDING status");
            }
        } else {
            throw new Exception("Event not found with ID: " + id);
        }
    }

    public boolean declineEvent(int id) throws Exception {
        Optional<Event> eventOpt = eventRepository.findById(id);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            if ("PENDING".equals(event.getStatus())) {
                eventRepository.delete(event);
                return true;
            } else {
                throw new Exception("Event is not in PENDING status");
            }
        } else {
            return false;
        }
    }

    private void validateEventRequest(EventRequest eventRequest) {
        if (eventRequest.getDate() == null || eventRequest.getDate().toLocalDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Event date must be in the future.");
        }
        if (eventRequest.getPrice() < 0) {
            throw new IllegalArgumentException("Price cannot be negative.");
        }
        if (eventRequest.getPincode() < 0) {
            throw new IllegalArgumentException("Pincode cannot be negative.");
        }
        if (eventRequest.getNoOfSeats() < 0) {
            throw new IllegalArgumentException("Number of seats cannot be negative.");
        }
       
    }
}

