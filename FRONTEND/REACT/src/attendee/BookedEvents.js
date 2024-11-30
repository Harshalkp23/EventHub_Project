import React, { useEffect, useState } from 'react';
import AttendeeNavbar from '../navbars/AttendeeNavbar'; // Correct import

const BookedEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId')).user.userId;

    fetch(`http://localhost:8080/bookings/user/${userId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Failed to fetch booked events.');
        }
        return resp.json();
      })
      .then((data) => {
        setBookedEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching booked events:', error);
      });
  }, []);

  return (
    <div>
      <AttendeeNavbar />
      <div className="container-fluid mt-4">
        <h2 className="text-center">Booked Events</h2> 
        {bookedEvents.length > 0 ? (
          <table className="table table-striped table-success">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Seats Booked</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookedEvents.map((event) => (
                <tr key={event.bookingId}>
                  <td>{event.event.eventName}</td>
                  <td>{event.event.date}</td>
                  <td>{event.noOfSeats}</td>
                  <td>{event.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No events booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookedEvents;
