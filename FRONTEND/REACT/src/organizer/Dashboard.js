import React from 'react';
import '../style/dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div><h2>Organizer Dashboard</h2></div>
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5 className="card-title">View Events</h5>
            <p className="card-text">Manage and view all upcoming events.</p>
            <button className="btn btn-primary w-100">View Events</button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5 className="card-title">View Bookings</h5>
            <p className="card-text">Check and manage your bookings.</p>
            <button className="btn btn-success w-100">View Bookings</button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5 className="card-title">Ratings</h5>
            <p className="card-text">View and analyze ratings and reviews.</p>
            <button className="btn btn-info w-100">View Ratings</button>
          </div>
        </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
