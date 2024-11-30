
import React, { useEffect, useState, useCallback } from 'react';
import AttendeeNavbar from '../navbars/AttendeeNavbar';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingDetails, setBookingDetails] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  const fetchCategories = useCallback(() => {
    fetch('http://localhost:8080/categories')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to fetch categories.');
        }
        return resp.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => setError(error.message));
  }, []);

  const fetchEvents = useCallback(() => {
    const timestamp = new Date().getTime(); // Cache-busting parameter
    const url =
      selectedCategory === 'All'
        ? `http://localhost:8080/events?_=${timestamp}`
        : `http://localhost:8080/events/category/${selectedCategory}?_=${timestamp}`;

    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to fetch event details.');
        }
        return resp.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => setError(error.message));
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, [fetchCategories, fetchEvents]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInputChange = (event, eventId) => {
    const noOfSeats = parseInt(event.target.value, 10) || 0;
    const eventPrice = events.find((event) => event.eventId === eventId)?.price || 0;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [eventId]: {
        noOfSeats,
        price: eventPrice,
        totalCost: noOfSeats * eventPrice,
      },
    }));
  };

  const handleBookNow = (eventId) => {
    const bookingDetail = bookingDetails[eventId];
    const userId = JSON.parse(localStorage.getItem('userId')).user.userId;

    if (!bookingDetail || bookingDetail.noOfSeats === 0) {
      setError('Please enter the number of seats.');
      return;
    }

    const bookingRequest = {
      userId,
      eventId,
      bookingDate: new Date().toISOString().slice(0, 10),
      noOfSeats: bookingDetail.noOfSeats,
      price: bookingDetail.price,
      totalCost: bookingDetail.totalCost,
    };

    fetch('http://localhost:8080/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingRequest),
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then((data) => {
            throw new Error(data.message || 'Failed to create booking.');
          });
        }
        return resp.json();
      })
      .then((data) => {
        console.log('Booking created successfully:', data);
        setError(''); // Clear any previous errors
        setSuccessMessage('Booking successful!'); // Set success message
        setBookingDetails((prevDetails) => {
          const newDetails = { ...prevDetails };
          delete newDetails[eventId];
          return newDetails;
        });
        fetchEvents(); // Fetch updated events after booking
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        setError(error.message || 'Booking failed.');
        setSuccessMessage(''); // Clear success message on error
      });
  };

  return (
    <div>
      <AttendeeNavbar/>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.catId} value={category.catId}>
                {category.catName}
              </option>
            ))}
          </select>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {events.map((event) => (
            <div
              key={event.eventId}
              style={{
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
              }}
            >
              <h5>{event.eventName}</h5>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Price:</strong> {event.price}</p>
              <p><strong>Address:</strong> {event.address}</p>
              <div style={{ marginTop: '10px' }}>
                <label htmlFor={`seats-${event.eventId}`}>Number of Seats:</label>
                <input
                  id={`seats-${event.eventId}`}
                  type="number"
                  min="1"
                  onChange={(e) => handleInputChange(e, event.eventId)}
                  style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                />
                <p style={{ marginTop: '10px' }}>
                  <strong>Total Cost:</strong> {bookingDetails[event.eventId]?.totalCost || 0}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginTop: '10px',
                }}
                onClick={() => handleBookNow(event.eventId)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;

