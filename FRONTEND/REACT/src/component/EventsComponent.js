import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/events.css';
import Navbar from './Navbar';

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch upcoming events from the Spring Boot API
    fetch(`http://localhost:8080/events`)
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date().toISOString().split('T')[0];
        const upcomingEvents = data.filter(event => event.date >= currentDate);
        setEvents(upcomingEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleBookNow = () => {
    alert('Login first');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="events-container">
        <h1>Upcoming Events</h1>
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.eventName}</h2>
              <p className="event-date">{event.date}</p>
              <p>{event.description}</p>
              <button className="btn btn-danger book-now-button" onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default EventsComponent;
