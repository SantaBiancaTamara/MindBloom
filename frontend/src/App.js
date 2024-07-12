import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import MoodEntry from './components/IncompleteMoodEntry';
import Activities from './components/CompleteActivityEntry';
import Entries from './components/UserEntries';
import EntriesForDay from './components/EntriesForDay';
import Journal from './components/Journal';
import Quotes from './components/Quotes';
import Note from './components/Note';
import JournalPage from './components/JournalPage';
import FullCalendarPage from './components/FullCalendarPage'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Statistics from './components/Statistics';
import StartPage from './components/StartPage';
import JournalForToday from './components/JournalForToday';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newentry' element={<MoodEntry />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/entries' element={<Entries />} />
          <Route path='/calendar' element={<FullCalendarPage />} />
          <Route path='/entries/:date' element={<EntriesForDay />} />
          <Route path='/journal' element={<Journal />} />
          <Route path='/journalsForToday/:timestamp' element={<JournalForToday />} />
          <Route path='/note' element={<Note />} />
          <Route path='/quotes' element={<Quotes />} />
          <Route path='/journal/:id' element={<JournalPage />} />
          <Route path='/statistics' element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
