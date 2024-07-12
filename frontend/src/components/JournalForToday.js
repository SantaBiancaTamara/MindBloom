import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar'; 
import '../styles/JournalForToday.css'; 

const JournalForToday = () => {
  const [journals, setJournals] = useState([]);
  const [message, setMessage] = useState('');
  const { timestamp } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getJournalsByDate/${timestamp}`, {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        if (response.data.length === 0) {
          setMessage('No journals for this day.');
        } else {
          setJournals(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage('No journals for this day.');
        } else {
          setMessage('Failed to fetch journal details.');
          console.error(error);
        }
      }
    };

    fetchJournals();
  }, [timestamp, token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteJournalById/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      setJournals(journals.filter(journal => journal._id !== id));
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  const handleDetails = (id) => {
    navigate(`/journal/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className="journal-for-today-page">
        <h1>Journals from {timestamp}</h1>
        {message ? (
          <div className="message">{message}</div>
        ) : (
          journals.length === 0 ? (
            <p>No journals found for this date.</p>
          ) : (
            <ul className="journal-list">
              {journals.map(journal => (
                <li key={journal._id}>
                  <span>
                    {new Date(journal.timestamp).toLocaleString()}
                    <button className="button button-details" onClick={() => handleDetails(journal._id)}>Details</button>
                    <button className="button button-delete" onClick={() => handleDelete(journal._id)}>Delete</button>
                  </span>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
};


export default JournalForToday;
