import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar'; 
import '../styles/DayEntries.css'; 
import axios from 'axios';

const DayEntries = () => {
  const { date } = useParams(); 
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token is missing. Please log in to continue.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/entries/${date}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setEntries(response.data);
      } catch (error) {
        console.error('Failed to fetch entries:', error.message);
        setError('Failed to fetch entries.');
      }
    };

    fetchEntries();
  }, [date]);

  const getMoodClass = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'awful':
        return 'awful';
      case 'bad':
        return 'bad';
      case 'meh':
        return 'meh';
      case 'good':
        return 'good';
      case 'very good':
        return 'very-good';
      default:
        return '';
    }
  };

  return (
    <NavBar>
      <div className="entry-tracker">
        <h2>Your Entries for this day</h2>
        {error && <p className="text-danger">{error}</p>} {}
        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index} className={`entry-item ${getMoodClass(entry.moodId?.name)}`}>
              <div className="entry-summary">
                <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>Mood:</strong> {entry.moodId?.name || 'Unknown'}</p>
                <p><strong>Activity - Category:</strong></p>
                <ul className="activities-list">
                  {entry.activityIds.map((activity, idx) => (
                    <li key={idx} className="activity-item">
                      {activity.name} - {activity.category?.name || 'No category'}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </NavBar>
  );
};

export default DayEntries;
