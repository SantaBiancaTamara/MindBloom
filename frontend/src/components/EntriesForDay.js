import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DayEntries = () => {
  const { date } = useParams(); // This assumes your route is set up like '/entries/:date'
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    
    const fetchEntries = async () => {
        try {
          const response = await fetch(`http://localhost:8080/entries/${date}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
              'Accept': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          setEntries(data);
          console.log(data);
        } catch (error) {
          console.error('Failed to fetch entries:', error.message);
        }
      };

    fetchEntries();
  }, [date]);

  return (
    <div>
      {entries.map(entry => (
        <div key={entry.timestamp}>
          <h3>{entry.moodName}</h3>
          <ul>
            {entry.activities.map(activity => (
              <li key={activity.name}>{activity.name} - {activity.description} ({activity.moodImpact})</li>
            ))}
          </ul>
          <p>{entry.isComplete ? 'Completed' : 'Incomplete'}</p>
        </div>
      ))}
    </div>
  );
};

export default DayEntries;
