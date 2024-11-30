
import React, { useState, useEffect } from 'react';
import '../style/addevent.css'; // Import your custom CSS for styling
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './loginSlice';

const AddEvent = () => {
    const [event, setEvent] = useState({
        eventName: '',
        description: '',
        date: '',
        price: '',
        address: '',
        city: '',
        pincode: '',
        noOfSeats: '',
        categoryId: ''
    });
    const [priceError, setPriceError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [noOfSeatsError, setNoOfSeatsError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate('/');
    };

    const [categories, setCategories] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let priceErrorMsg = '';
        let pincodeErrorMsg = '';
        let noOfSeatsErrorMsg = '';

        // Validate the input value and set error messages if needed
        if (name === 'price' && value < 0) {
            priceErrorMsg = 'Price cannot be negative';
        }
        if (name === 'pincode') {
            if (value < 0) {
                pincodeErrorMsg = 'Pincode cannot be negative';
            } else if (value.length !== 6) {
                pincodeErrorMsg = 'Pincode must be 6 digits long';
            } else {
                pincodeErrorMsg = ''; // Clear error if valid
            }
        }
        if (name === 'noOfSeats' && value < 0) {
            noOfSeatsErrorMsg = 'Number of seats cannot be negative';
        }

        // Update the state based on the field and its value
        setEvent({
            ...event,
            [name]: value
        });
        setPriceError(priceErrorMsg);
        setPincodeError(pincodeErrorMsg);
        setNoOfSeatsError(noOfSeatsErrorMsg);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for errors before submitting
        if (priceError || pincodeError || noOfSeatsError) {
            alert('Please fix the errors before submitting.');
            return; // Stop form submission if there are errors
        }

        const sendData = {
            eventName: event.eventName,
            description: event.description,
            date: event.date,
            price: event.price,
            address: event.address,
            city: event.city,
            pincode: event.pincode,
            noOfSeats: event.noOfSeats,
            catId: event.categoryId
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        };

        fetch("http://localhost:8080/events/create", reqdata)
            .then(response => {
                if (response.ok) {
                    alert('Event added successfully!');
                    // Reset form
                    setEvent({
                        eventName: '',
                        description: '',
                        date: '',
                        price: '',
                        address: '',
                        city: '',
                        pincode: '',
                        noOfSeats: '',
                        categoryId: ''
                    });
                    setPriceError('');
                    setPincodeError('');
                    setNoOfSeatsError('');
                } else {
                    alert("Failed to add event");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while adding the event.');
            });
    };

    const today = new Date().toISOString().split('T')[0];

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
                            <li className="nav-item"><Link to="/organizer/dashboard" className="nav-link">Dashboard</Link></li>
                            <li className="nav-item"><Link to="/organizer/myevents" className="nav-link">My Events</Link></li>
                            <li className="nav-item"><Link to="/organizer/organizerbookings" className="nav-link">Bookings</Link></li>
                            <li className="nav-item"><Link to="/organizer/earnings" className="nav-link">Earnings</Link></li>
                            <li className="nav-item"><Link to="/addevents" className="nav-link">Add Events</Link></li>
                        </ul>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <div className="add-event-container">
                <h2 className="text-center">Add New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="eventName" className="form-label">Event Name:</label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            className="form-control"
                            value={event.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={event.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            value={event.date}
                            onChange={handleChange}
                            required
                            min={today} // Set minimum date to today
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={event.price}
                            onChange={handleChange}
                            required
                        />
                        {priceError && <div className="text-danger">{priceError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={event.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City:</label>
                        <select
                            id="city"
                            name="city"
                            className="form-control"
                            value={event.city}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled hidden>Select City</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode" className="form-label">Pincode:</label>
                        <input
                            type="number"
                            id="pincode"
                            name="pincode"
                            className="form-control"
                            value={event.pincode}
                            onChange={handleChange}
                            required
                        />
                        {pincodeError && <div className="text-danger">{pincodeError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="noOfSeats" className="form-label">Number of Seats:</label>
                        <input
                            type="number"
                            id="noOfSeats"
                            name="noOfSeats"
                            className="form-control"
                            value={event.noOfSeats}
                            onChange={handleChange}
                            required
                        />
                        {noOfSeatsError && <div className="text-danger">{noOfSeatsError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId" className="form-label">Category:</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            className="form-control"
                            value={event.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.catId} value={category.catId}>
                                    {category.catName} {/* Adjust based on actual category properties */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;

