// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Import the CSS file

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword to the state
  });
  const [error, setError] = useState(''); // State to hold error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match, please try again');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
      return;
    }
    try {
      // Adjust the URL to match your server's address and port
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log('Registration Success:', response.data);
      // Optionally redirect the user or clear the form here
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Registration Failed:', error.response.data);
        setError('Registration failed, please try again');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Registration Failed: No response from the server', error.request);
        setError('No response from the server, please try again later');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError('An error occurred, please try again');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="app-title">MindBloom</h1>
        <p className="app-subtitle">From Mood Tracking to Emotional Blooming</p>
      </div>
      <div className="register-right">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              className="form-control"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
