import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({children}){

    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate('/home')}>New Entry</button>
                <button onClick={() => navigate('/statistics')}>Statistics</button>
                <button onClick={() => navigate('/newcalendar')}>Calendar</button>
                <button onClick={() => navigate('/quotes')}>Quotes</button>
            </nav>
            <div className="content">
                {children}  // This will render the child components
            </div>
        </div>
    );
}

export default NavBar;
