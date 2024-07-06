import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); 
  const [showRegister, setShowRegister] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      console.log('login:', response.data);
      localStorage.setItem('token', response.data);
      console.log('Stored token:', localStorage.getItem('token')); 

      navigate('/entries');
      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('User not found. Please register!');
        setShowRegister(true); // Show the Register button
      } else if (error.response && error.response.status === 400) {
        console.error('login failed:', error.response.data);
        setError('Incorrect password. Please try again!');
      } else if (error.request) {
        console.error('login: server error', error.request);
        setError('No response from the server, please try again later');
      } else {
        console.error('error:', error.message);
        setError('An error occurred, please try again');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="app-title">MindBloom</h1>
        <p className="app-subtitle">From Mood Tracking to Emotional Blooming</p>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
          {error && <div className="error-message">{error}</div>} 
          <button type="submit" className="btn btn-primary mt-2">Login</button>
          {showRegister && (
            <button onClick={handleRegisterRedirect} className="btn btn-secondary mt-2">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
