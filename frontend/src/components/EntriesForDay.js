import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar'; // Adjust the import according to your project structure

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

  return (
    <NavBar>
      <div className="entry-tracker">
        <h2>Your Entries</h2>
        {error && <p className="text-danger">{error}</p>} {/* Display error if exists */}
        <ul className="entries-list">
          {entries.map((entry, index) => (
            <li key={index} className="entry-item">
              <div className="entry-summary">
                <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>Mood:</strong> {entry.moodName}</p>
                <ul>
                  {entry.activities.map((activity, idx) => (
                    <li key={idx}>{activity.name} - {activity.description} ({activity.moodImpact})</li>
                  ))}
                </ul>
                {/* <p><strong>Status:</strong> {entry.isComplete ? 'Completed' : 'Incomplete'}</p> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </NavBar>
  );
};

export default DayEntries;
