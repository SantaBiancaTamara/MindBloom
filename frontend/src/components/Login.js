import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      console.log('Login Success:', response.data);
      localStorage.setItem('token', response.data);
      console.log('Stored token:', localStorage.getItem('token')); // Check if the token is stored correctly

      navigate('/entries')
      // Redirect to homepage or perform other actions after login
    } catch (error) {
      if (error.response) {
        console.error('Login Failed:', error.response.data);
      } else if (error.request) {
        console.error('Login Failed: No response from the server', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
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
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Login</button>
      </form>
      <p className="mt-3">
        Forgot password? <a href="#">Click here</a>
      </p>
    </div>
  );
}

export default Login;
