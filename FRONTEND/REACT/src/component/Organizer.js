import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../organizer/Dashboard';
import MyEvents from '../organizer/MyEvents';
import Bookings from '../organizer/OrganizerBookings';
// import Earnings from '../organizer/Earnings';
import Support from '../organizer/Support';
import '../style/organizer.css';
import LoginComponent from './LoginComponent';
import { logout, setUser } from './loginSlice'; 

export const Organizer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Retrieve user information from the Redux store
  const user = useSelector((state) => state.login.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <div className="navbar-brand">Organizer</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item"><Link to="/organizer/dashboard" className="nav-link">Dashboard</Link></li> */}
              <li className="nav-item"><Link to="/organizer/myevents" className="nav-link">My Events</Link></li>
              <li className="nav-item"><Link to="/organizer/organizerbookings" className="nav-link">Bookings</Link></li>
              {/* <li className="nav-item"><Link to="/organizer/earnings" className="nav-link">Earnings</Link></li> */}
              <li className="nav-item"><Link to="/addevents" className="nav-link">Add Events</Link></li>
            </ul>
            <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <h1 className="text-center text-bg-dark my-4">
        Welcome, {user?.fname} {user?.lname}
      </h1>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/bookings" element={<Bookings />} />
        {/* <Route path="/earnings" element={<Earnings />} /> */}
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<LoginComponent />} />  {/* Ensure this route exists */}
      </Routes>
    </div>
  );
};
