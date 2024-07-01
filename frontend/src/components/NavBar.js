import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css'; // Import the CSS file

function NavBar({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => navigate('/entries')}>Home</button>
        <button onClick={() => navigate('/newentry')}>New Entry</button>
        <button onClick={() => navigate('/statistics')}>Statistics</button>
        <button onClick={() => navigate('/calendar')}>Calendar</button>
        <button onClick={() => navigate('/quotes')}>Quotes</button>
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default NavBar;
