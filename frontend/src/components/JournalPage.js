import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useParams } from 'react-router-dom';
import '../styles/Journal.css'; 

const JournalPage = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getJournalById/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJournal(response.data);
            } catch (error) {
                setError('Failed to fetch journal entry.');
                console.error(error);
            }
        };

        fetchJournal();
    }, [id, token]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!journal) {
        return <div>Loading...</div>;
    }

    return (
        <>
          <NavBar />
          <div className="journal-page">
              <div className="journal-container">
                  <h1>Journal Entry</h1>
                  <p><strong>Date:</strong> {new Date(journal.timestamp).toLocaleString()}</p>
                  <h2>Content</h2>
                  <p>{journal.content}</p>
                  <h2>Detected Emotions</h2>
                  <ul>
                      {journal.emotions.map((emotion, index) => (
                          <li key={index}>
                              {emotion.label}: {Math.round(emotion.score * 100)}%
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
        </>
      );
    };

export default JournalPage;
