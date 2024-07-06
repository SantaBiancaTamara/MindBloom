import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // Ensure this path is correct
import '../styles/calendar.css'; // Ensure this path is correct

function FullCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSeeDayEntries = () => {
    navigate(`/entries/${selectedDate}`);
    setOpen(false);
  };

  const handleJournal = () => {
    navigate('/journal', { state: { selectedDate } });
    setOpen(false);
  };

  const handleNote = () => {
    navigate('/note', { state: { selectedDate } });
    setOpen(false);
  };

  return (
    <NavBar>
      <div className="full-calendar-container">
        <h2>Full Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          height="auto"
        />
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Select an option</DialogTitle>
          <DialogActions>
            <Button onClick={handleSeeDayEntries}>See Day Entries</Button>
            <Button onClick={handleJournal}>Journal</Button>
            <Button onClick={handleNote}>Note</Button>
          </DialogActions>
        </Dialog>
      </div>
    </NavBar>
  );
}

export default FullCalendarPage;
