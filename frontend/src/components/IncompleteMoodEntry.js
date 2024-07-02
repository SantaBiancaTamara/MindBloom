// src/components/MoodEntry.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MoodEntry.css';
import NavBar from './NavBar'; // Import NavBar component

function MoodEntry() {
  const [moods, setMoods] = useState([]);
  const [error, setError] = useState(''); // State to handle any error
  const [selectedMood, setSelectedMood] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing');
        setError('Please log in to continue.');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:8080/getMoods', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Assuming the response contains an array of moods
        const moodsWithColors = response.data.map(mood => {
          switch (mood.name.toLowerCase()) {
            case 'very good':
              return { ...mood, color: 'green', hoverColor: '#00b300' };
            case 'good':
              return { ...mood, color: 'lightgreen', hoverColor: '#99cc00' };
            case 'meh':
              return { ...mood, color: 'yellow', hoverColor: '#ffcc00' };
            case 'bad':
              return { ...mood, color: 'orange', hoverColor: '#ff6600' };
            case 'awful':
              return { ...mood, color: 'red', hoverColor: '#ff0000' };
            default:
              return { ...mood, color: '#333', hoverColor: '#555' }; // Default color
          }
        });
        setMoods(moodsWithColors);
      } catch (err) {
        // Handle errors: No response received, server error responses, and others
        const errorMessage = err.response
          ? err.response.data.message
          : err.request
          ? 'No response received from server'
          : err.message;
          
        console.error("Failed to fetch moods:", errorMessage);
        setError(errorMessage);
      }
    };

    fetchMoods();
  }, []); // Dependency array is empty, meaning this effect runs once on component mount

  const handleSelectMood = (moodId) => {
    setSelectedMood(moodId);
  };

  const saveInitialMood = async () => {
    if (!selectedMood) {
      setError('Please select a mood before continuing.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/insertIncompleteEntry', {
        moodId: selectedMood
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const entryId = response.data._id;
      localStorage.setItem('entryId', entryId);
      navigate('/activities'); // Redirect to activities page after saving
    } catch (error) {
      console.error('Failed to save mood:', error);
      setError('Failed to save mood. Please try again.');
    }
  };
  
  return (
    <NavBar>
      <div className="container">
        <div className="mood-tracker">
          <h2>How are you feeling today?</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mood-options">
            {moods.map((mood) => (
              <button 
                key={mood._id} 
                className={`mood-button ${selectedMood === mood._id ? 'selected' : ''}`} 
                style={{ 
                  backgroundColor: selectedMood === mood._id ? mood.color : '#333',
                  borderColor: mood.color
                }}
                onClick={() => handleSelectMood(mood._id)}
              >
                {mood.name}
              </button>
            ))}
          </div>
          <button onClick={saveInitialMood} className="continue-button">Continue</button>
        </div>
      </div>
    </NavBar>
  );
}

export default MoodEntry;
