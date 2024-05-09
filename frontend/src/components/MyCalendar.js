import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling
import { useNavigate } from 'react-router-dom'; // For navigation

function MyCalendar() {
    const [date, setDate] = useState(new Date());
    const [showOptions, setShowOptions] = useState(false); // State to show options
    const navigate = useNavigate();

    const onChange = (newDate) => {
        setDate(newDate);
        setShowOptions(true); // Show options upon selecting a date
    };

    const viewEntries = () => {
        navigate(`/entries/${date.toISOString().split('T')[0]}`); // Navigate to entries page with the selected date
    };

    const goToBlankPage = () => {
        navigate('/blank'); // Navigate to a blank page
    };

    return (
        <div>
            <h2>Calendar</h2>
            <Calendar
                onChange={onChange}
                value={date}
            />
            {showOptions && (
                <div>
                    <button onClick={viewEntries}>See Entry</button>
                    <button onClick={goToBlankPage}>Blank Page</button>
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
