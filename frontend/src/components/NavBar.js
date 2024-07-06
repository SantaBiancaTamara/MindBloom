import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NavBar.css'; 

function NavBar({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            await axios.post('http://localhost:8080/logout',{}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('logout error:', error);
        }
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
        <button onClick={handleLogout}>Logout</button> 
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default NavBar;
