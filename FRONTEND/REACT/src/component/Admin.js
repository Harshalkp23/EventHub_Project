import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { logout } from './loginSlice'; 

const AdminPage = () => {
    const [pendingEvents, setPendingEvents] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPendingEvents();
        fetchPendingUsers(); 
    }, []);

    const fetchPendingEvents = () => {
        fetch('http://localhost:8080/admin/events/pending')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) { 
                    setPendingEvents(data);
                } else {
                    setError('Unexpected response format for events.');
                }
            })
            .catch(error => {
                console.error('Error fetching pending events:', error);
                setError('Failed to fetch pending events.');
            });
    };

    const fetchPendingUsers = () => {
        fetch('http://localhost:8080/admin/users/pending')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) { 
                    setPendingUsers(data);
                } else {
                    setError('Unexpected response format for users.');
                }
            })
            .catch(error => {
                console.error('Error fetching pending users:', error);
                setError('Failed to fetch pending users.');
            });
    };

    const handleApproveEvent = (id) => {
        fetch(`http://localhost:8080/admin/events/${id}/approve`, {
            method: 'PUT',
        })
        .then(response => {
            if (response.ok) {
                fetchPendingEvents(); 
                alert('Event approved successfully!');
            } else {
                alert('Failed to approve event.');
            }
        })
        .catch(error => {
            console.error('Error approving event:', error);
            alert('Error approving event.');
        });
    };

    const handleDeclineEvent = (id) => {
        fetch(`http://localhost:8080/admin/events/${id}/decline`, {
            method: 'PUT',
        })
        .then(response => {
            if (response.ok) {
                fetchPendingEvents(); 
                alert('Event declined.');
            } else {
                alert('Failed to decline event.');
            }
        })
        .catch(error => {
            console.error('Error declining event:', error);
            alert('Error declining event.');
        });
    };

    const handleApproveUser = (id) => {
        fetch(`http://localhost:8080/admin/users/${id}/approve`, {
            method: 'PUT',
        })
        .then(response => {
            if (response.ok) {
                fetchPendingUsers(); 
                alert('User approved successfully!');
            } else {
                alert('Failed to approve user.');
            }
        })
        .catch(error => {
            console.error('Error approving user:', error);
            alert('Error approving user.');
        });
    };

    const handleDeclineUser = (id) => {
        fetch(`http://localhost:8080/admin/users/${id}/decline`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchPendingUsers(); 
                alert('User declined.');
            } else {
                alert('Failed to decline user.');
            }
        })
        .catch(error => {
            console.error('Error declining user:', error);
            alert('Error declining user.');
        });
    };

    const handleLogout = () => {
        localStorage.clear();  
        dispatch(logout());    
        navigate('/');      
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand text-white">Admin</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/admin/dashboard" className="nav-link">Dashboard</Link></li>
                            <li className="nav-item"><Link to="/admin/pending-events" className="nav-link">Pending Events</Link></li>
                            <li className="nav-item"><Link to="/admin/pending-users" className="nav-link">Pending Users</Link></li> {/* Added link for pending users */}
                        </ul>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                <h1 className="text-center my-4">Admin Page</h1>

                {error && <p className="error">{error}</p>}

                <h2>Pending Events</h2>
                {pendingEvents.length === 0 ? (
                    <p>No pending events.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Event Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Pincode</th>
                                <th>No. of Seats</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingEvents.map(event => (
                                <tr key={event.eventId}>
                                    <td>{event.eventId}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.description}</td>
                                    <td>{event.date}</td>
                                    <td>{event.price}</td>
                                    <td>{event.address}</td>
                                    <td>{event.city}</td>
                                    <td>{event.pincode}</td>
                                    <td>{event.noOfSeats}</td>
                                    <td>
                                        <button onClick={() => handleApproveEvent(event.eventId)} className="btn btn-success me-2">Approve</button>
                                        <button onClick={() => handleDeclineEvent(event.eventId)} className="btn btn-danger">Decline</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <h2>Pending Users</h2>
                {pendingUsers.length === 0 ? (
                    <p>No pending users.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map(user => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.fname}</td>
                                    <td>{user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.roleName}</td> 
                                    <td>
                                        <button onClick={() => handleApproveUser(user.userId)} className="btn btn-success me-2">Approve</button>
                                        <button onClick={() => handleDeclineUser(user.userId)} className="btn btn-danger">Decline</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
