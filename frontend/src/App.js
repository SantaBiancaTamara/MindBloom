import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/IncompleteMoodEntry'
import Activities from './components/CompleteActivityEntry.js'
import Entries from './components/UserEntries.js'
import MyCalendar from './components/MyCalendar.js'
import MyFullCalendar from './components/MyFullCalendar.js'
import EntriesForDay from './components/EntriesForDay.js'
import BlankPage from './components/BlankPage.js'
import Calendar from './components/Calendar.js'
//import NavBar from './components/NavBar.js'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path ='/register' element = {<Register />}></Route>
        <Route path ='/login' element = {<Login />}></Route>
        <Route path = '/home' element = {<Home />}></Route>
        <Route path = '/activities' element = {<Activities />}></Route>
        <Route path = '/entries' element = {<Entries />}></Route>
        <Route path = '/calendar' element={<MyCalendar />} />
        <Route path="/fullcalendar" element={<MyFullCalendar />} />
        <Route path="/newcalendar" element={<Calendar />} /> 
        <Route path="/entries/:date" element={<EntriesForDay />} />
        <Route path="/blank" element={<BlankPage />} />

        {/* <Route path= '/statistics' element={<Statistics />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/quotes' element={<Quotes />} /> */}
      </Routes>
      </BrowserRouter>
   </div> 
  )
}

export default App;
