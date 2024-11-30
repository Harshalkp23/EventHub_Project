
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const Booking = () => {
  const location = useLocation();
  const { eventId, price } = location.state || {}; 

  
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : null; 

  const [date, setDate] = useState('');
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price || 0);

  
  const handleNoOfSeatsChange = (e) => {
    const value = Math.max(1, Math.min(5, e.target.value)); 
    setNoOfSeats(value);
    setTotalPrice(value * price); 
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleIncrement = () => {
    setNoOfSeats((prev) => {
      const newValue = Math.min(prev + 1, 5);
      setTotalPrice(newValue * price);
      return newValue;
    });
  };

  const handleDecrement = () => {
    setNoOfSeats((prev) => {
      const newValue = Math.max(prev - 1, 1);
      setTotalPrice(newValue * price);
      return newValue;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!userId) {
      alert('User not logged in or user ID not available.');
      return;
    }

   
    const bookingData = {
      booking_date: date,
      no_of_seats: noOfSeats,
      price: price,
      total_cost: totalPrice,
      user_id: userId,
      event_id: eventId,
    };

    
    fetch('http://localhost:8080/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to confirm booking.');
        }
        return response.json();
      })
      .then((data) => {
        
        alert('Booking confirmed!');
        
      })
      .catch((error) => {
        console.error('Error confirming booking:', error);
        alert('There was an error confirming your booking. Please try again.');
      });
  };

  if (!eventId || price === undefined) {
    return <div className="container mt-4">No event selected or price not available.</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Book Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bookingDate" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="bookingDate"
            className="form-control"
            value={date}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]} 
            required
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="noOfSeats" className="form-label me-2">
            Number of Seats:
          </label>
          <div className="input-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleDecrement}
              disabled={noOfSeats <= 1}
            >
              -
            </button>
            <input
              type="number"
              id="noOfSeats"
              className="form-control text-center"
              value={noOfSeats}
              onChange={handleNoOfSeatsChange}
              min="1"
              max="5"
              required
              readOnly
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleIncrement}
              disabled={noOfSeats >= 5}
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-3">
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
