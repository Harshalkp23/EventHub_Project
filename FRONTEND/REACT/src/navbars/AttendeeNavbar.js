
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AttendeeNavbar = () => {
  const handleLogout = () => {
    // Your logout logic here
    localStorage.removeItem('userId');
    window.location.href = '/login'; // Redirect to login page or home
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand text-white">Attendee</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link to="/organizer/dashboard" className="nav-link text-white">Dashboard</Link></li>
              <li className="nav-item"><Link to="/attendee/viewevents" className="nav-link text-white">View Events</Link></li>
              <li className="nav-item"><Link to="/attendee/bookedevents" className="nav-link text-white">Booked Events</Link></li>
              <li className="nav-item"><Link to="/attendee/profile" className="nav-link text-white">Profile</Link></li>
            </ul>
            <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AttendeeNavbar;
