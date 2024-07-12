import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React from 'react';
import '../styles/calendar.css'; 

function MyFullCalendar() {
    return (
        <div className="full-calendar-container">
            <h2>Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
        </div>
    );
}


export default MyFullCalendar;
