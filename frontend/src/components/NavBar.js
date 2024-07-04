import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css'; // Import the CSS file

function NavBar({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Remove the token from localStorage
      localStorage.removeItem('token');
      console.log(localStorage.getItem('token'));

      // Redirect to the login page
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => navigate('/entries')}>Home</button>
        <button onClick={() => navigate('/newentry')}>New Entry</button>
        <button onClick={() => navigate('/statistics')}>Statistics</button>
        <button onClick={() => navigate('/calendar')}>Calendar</button>
        <button onClick={() => navigate('/quotes')}>Quotes</button>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default NavBar;
