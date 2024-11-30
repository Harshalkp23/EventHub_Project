import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/attendee.css';
import Navbar from "./Navbar";

const OrganiserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [dob, setDob] = useState('');
  const [aadharNo, setAadharNumber] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setPhoneNumber] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const rid = 2; // Set rid to 2 by default

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value) error = 'Username is required';
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      case 'fname':
        if (!value) error = 'First Name is required';
        break;
      case 'lname':
        if (!value) error = 'Last Name is required';
        break;
      case 'dob':
        if (!value) {
          error = 'Date of Birth is required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          error = 'Date of Birth must be in the format YYYY-MM-DD';
        } else if (!isAgeValid(value)) {
          error = 'You must be at least 18 years old';
        }
        else {
          const dobDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dobDate.getFullYear();
          const monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
          if (dobDate >= today) {
            error = 'Date of Birth cannot be today or a future date';
          } else if (age < 18) {
            error = 'You must be at least 18 years old';
          }
        }
        break;
      case 'aadharNo':
        if (!value) {
          error = 'Aadhar Number is required';
        } else if (!/^\d{12}$/.test(value)) {
          error = 'Aadhar Number must be 12 digits';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'pincode':
        if (!value) {
          error = 'Pincode is required';
        } else if (!/^\d{6}$/.test(value)) {
          error = 'Pincode must be 6 digits';
        }
        break;
      case 'address':
        if (!value) error = 'Address is required';
        break;
      case 'mobileNo':
        if (!value) {
          error = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone Number must be 10 digits';
        }
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };
  const isAgeValid = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'fname':
        setFname(value);
        break;
      case 'lname':
        setLname(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'aadharNo':
        setAadharNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'pincode':
        setPincode(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
    validateField(id, value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const isValid = Object.values(formErrors).every((error) => error === '') &&
                    username && password && fname && lname && dob && aadharNo &&
                    email && pincode && address && mobileNo;
  
    if (!isValid) {
      setError('Please fix the errors in the form');
      return;
    }
  
    fetch('https://localhost:7028/api/UserManagement/Register/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        fname,
        lname,
        dob,
        aadharNo,
        email,
        pincode,
        address,
        mobileNo,
        rid,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setRegistrationMessage(data);
      setError(null);
      alert("Registration Successful");
      navigate("/login");
    })
    .catch(error => {
      console.error(error);
      setError('An error occurred during registration');
      setRegistrationMessage('');
    })
    .finally(() => {
      setUsername('');
      setPassword('');
      setFname('');
      setLname('');
      setDob('');
      setAadharNumber('');
      setEmail('');
      setPincode('');
      setAddress('');
      setPhoneNumber('');
      setFormErrors({});
    });
  };
  

  return (
    <div>
      <Navbar/>
    <div className="registration-container">
      
      <h2>Organizer Registration</h2>
      {error && <p className="error">{error}</p>}
      {registrationMessage && <p className="success">{registrationMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleInputChange} required />
        {formErrors.username && <p className="error">{formErrors.username}</p>}
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handleInputChange} required />
        {formErrors.password && <p className="error">{formErrors.password}</p>}

        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" value={fname} onChange={handleInputChange} required />
        {formErrors.fname && <p className="error">{formErrors.fname}</p>}

        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" value={lname} onChange={handleInputChange} required />
        {formErrors.lname && <p className="error">{formErrors.lname}</p>}

        <label htmlFor="dob">DOB:</label>
        <input type="date" id="dob" value={dob} onChange={handleInputChange} required />
        {formErrors.dob && <p className="error">{formErrors.dob}</p>}

        <label htmlFor="aadharNo">Aadhar Number:</label>
        <input type="text" id="aadharNo" value={aadharNo} onChange={handleInputChange} required />
        {formErrors.aadharNo && <p className="error">{formErrors.aadharNo}</p>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleInputChange} required />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <label htmlFor="pincode">Pincode:</label>
        <input type="text" id="pincode" value={pincode} onChange={handleInputChange} required />
        {formErrors.pincode && <p className="error">{formErrors.pincode}</p>}

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={handleInputChange} required />
        {formErrors.address && <p className="error">{formErrors.address}</p>}

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" value={mobileNo} onChange={handleInputChange} required />
        {formErrors.mobileNo && <p className="error">{formErrors.mobileNo}</p>}

        <button className="btn bg-warning" type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default OrganiserRegistration;
