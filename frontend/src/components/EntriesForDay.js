import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust the import according to your project structure
import '../styles/DayEntries.css'; // Import the CSS file for styling

const DayEntries = () => {
  const { date } = useParams(); 
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`http://localhost:8080/entries/${date}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched entries:', data); 
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch entries:', error.message);
        setError(error.message); 
      }
    };

    fetchEntries();
  }, [date]);

  const getMoodClass = (mood) => {
    switch (mood) {
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
        {error && <p className="text-danger">{error}</p>} {/* Display error if exists */}
        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index} className={`entry-item ${getMoodClass(entry.moodName.toLowerCase())}`}>
              <div className="entry-summary">
                <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>Mood:</strong> {entry.moodName}</p>
                <p><strong>Activity - Category:</strong></p>
                <ul className="activities-list">
                  {entry.activities.map((activity, idx) => (
                    <li key={idx} className="activity-item">
                      {activity.name} - {activity.category?.name}
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
