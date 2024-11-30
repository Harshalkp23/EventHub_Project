
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from './loginSlice';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import Navbar from './Navbar';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user, errorMessage } = useSelector((state) => state.login);

  const validate = () => {
    let inputErrors = {};
    let isValid = true;

    if (!username) {
      isValid = false;
      inputErrors["username"] = "Please enter your username";
    }
    if (!password) {
      isValid = false;
      inputErrors["password"] = "Please enter your password";
    }
    setErrors(inputErrors);
    return isValid;
  }

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(loginRequest());

  //   if (validate()) {
  //     fetch('https://localhost:7028/api/UserManagement/Login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         Username: username,
  //         Password: password,
  //       }),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.message === 'Login successful.') {
  //           if (data.user.status === 'PENDING') {
  //             dispatch(loginFailure('Admin approval is pending.'));
  //           } else if (data.user.status === 'APPROVED') {
  //             localStorage.setItem('userId', JSON.stringify(data));
  //             dispatch(loginSuccess(data.user));
  //           } else {
  //             dispatch(loginFailure('Your account status does not allow login.'));
  //           }
  //         } else {
  //           dispatch(loginFailure(data.message || 'Login failed.'));
  //         }
  //       })
  //       .catch(error => {
  //         dispatch(loginFailure('An error occurred during login. Please try again.'));
  //       });
  //   }
  // };
  const handleLogin = (e) => {
  e.preventDefault();
  dispatch(loginRequest());

  if (validate()) {
    fetch('https://localhost:7028/api/UserManagement/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`Login failed`);
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Login successful.') {
          if (data.user.status === 'PENDING') {
            dispatch(loginFailure('Admin approval is pending.'));
          } else if (data.user.status === 'APPROVED') {
            localStorage.setItem('userId', JSON.stringify(data));
            dispatch(loginSuccess(data.user));
          } else {
            dispatch(loginFailure('Your account status does not allow login.'));
          }
        } else {
          dispatch(loginFailure(data.message || 'Login failed.'));
        }
      })
      .catch(error => {
        // Handle network errors or unexpected issues
        dispatch(loginFailure(error.message || 'An error occurred during login. Please try again.'));
      });
  }
};


  useEffect(() => {
    if (isLoggedIn && user) {
      const userRoleId = user.rid;
      if (userRoleId === 2) {
        navigate('/organizer');
      } else if (userRoleId === 3) {
        navigate('/attendee');
      } else if (userRoleId === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h4 className='textdec'>Login Page</h4>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <div className="text-danger">{errors.username}</div>}
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </label>
          {errors.submit && <div className="text-danger">{errors.submit}</div>}
          <button type="submit">Login</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default LoginComponent;

