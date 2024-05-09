import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EntriesForDay() {
    const { date } = useParams(); // Get the date from the route parameter
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage
            if (!token) {
                setError('No token found. Please log in again.');
                return;
            }
            try {
                console.log(date);
                const response = await axios.get(`http://localhost:8080/entries/date/${date}`, {
             
                    headers: {
                        Authorization: `Bearer ${token}` // Add the Authorization header
                    }
                });
                setEntries(response.data);
            } catch (err) {
                const errorMessage = err.response ? err.response.data.message : 'Failed to fetch entries.';
                setError(errorMessage);
            }
        };

        fetchEntries();
    }, [date]);

    return (
        <div>
          <h1>Entries for {date}</h1>
          {error && <p className="text-danger">{error}</p>}
          {entries.map(entry => (
            <div key={entry._id}>
              <p><strong>User:</strong> {entry.userId.name} ({entry.userId.nickname})</p>  // Displays full name and nickname
              <p><strong>Mood:</strong> {entry.moodId.name}</p>  // Adjusted to use the 'name' field from the Mood model
              <p><strong>Activities:</strong> {entry.activityIds.map(activity => activity.name).join(', ')}</p>  // Assuming each activity has a 'name'
              <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(entry.timestamp).toLocaleTimeString()}</p>
              <p><strong>Complete:</strong> {entry.isComplete ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      );
}

export default EntriesForDay;
