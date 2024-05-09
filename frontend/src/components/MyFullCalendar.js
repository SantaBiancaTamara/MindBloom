import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';
import '../styles/calendar.css'; // Make sure the CSS path is correct

function MyFullCalendar() {
    return (
        <div className="full-calendar-container">
            <h2>Full Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
        </div>
    );
}


export default MyFullCalendar;
