import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/MyCalendar.css'; // Import your custom CSS for additional styling

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

    const goToJournal = () => {
        navigate('/journal'); // Navigate to a blank page
    };

    const goToNote = () => {
        navigate('/note');
    };

    return (
        <div className="calendar-container">
            <h2>Calendar</h2>
            <Calendar
                onChange={onChange}
                value={date}
                className="custom-calendar"
            />
            {showOptions && (
                <div className="options-container">
                    <button onClick={viewEntries}>See Entry</button>
                    <button onClick={goToJournal}>Journal</button>
                    <button onClick={goToNote}>Note</button>
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
