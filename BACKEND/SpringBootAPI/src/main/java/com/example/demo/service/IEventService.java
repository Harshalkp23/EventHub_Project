package com.example.demo.service;

import java.util.List;

import com.example.demo.entities.Event;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;

public interface IEventService {
	List<Event> getAllEvents();

	Event getEventById(int id);

//  Event createEvent(Event event);
	Event updateEvent(int id, Event event);

	void deleteEvent(int id);

	void createEvent(Event event, User user);
}
