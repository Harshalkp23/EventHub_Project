import React, { useEffect, useState } from 'react';
import { Organizer } from '../component/Organizer';

const MyEvents = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [events, setEvents] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = () => {
      fetch('http://localhost:8080/categories')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch categories');
          }
        })
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
    };

    fetchCategories();
  }, []);

  // Fetch events based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:8080/events/category/${selectedCategory}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch events');
          }
        })
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    } else {
      // Clear events if no category is selected
      setEvents([]);
    }
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <Organizer/>
      {/* <h1>My Events</h1> */}
      <div className='container-fluid'>
        <label  className='text-danger fw-bold fst-italic' htmlFor="category">Select Category:</label>
        <select className='bg-light rounded fw-bold border-warning' id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.catId} value={category.catId}>
              {category.catName} {/* Adjust based on actual category properties */}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
  
  <table className="table table-striped table-success">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Price</th>
                <th>Address</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.eventId}>
                  <td>{event.eventName}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.price}</td>
                  <td>{event.address}</td>
                  <td>{event.city}</td>
                  <td>{event.pincode}</td>
                  <td>{event.noOfSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
