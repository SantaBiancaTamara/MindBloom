import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });
  const [error, setError] = useState(''); 

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
      setError('Passwords do not match, please try again!');
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
      return;
    }
    try {

      const response = await axios.post('http://localhost:8080/register', formData);
      console.log('user registered successfully', response.data);
      navigate('/login');

    } catch (error) {
      if (error.response) {
        console.error('registration failed', error.response.data);
        setError('Registration failed, please try again!');
      } else if (error.request) {
        console.error('no response from the server', error.request);
        setError('No response from the server, please try again later!');
      } else {
        console.error('error:', error.message);
        setError('An error occurred, please try again!');
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
          {error && <div className="error-message">{error}</div>} 
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
