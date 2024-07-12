import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 

function MoodEntry() {
  const [moods, setMoods] = useState([]);
  const [error, setError] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoods = async () => {

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('no auth token');
        setError('Please log in to continue.');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:8080/getMoods', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        const moodsColor = response.data.map(mood => {
          switch (mood.name) {
            case 'Very Good':
              return {...mood, color: 'green' };
            case 'Good':
              return {...mood, color: 'lightgreen' };
            case 'Meh':
              return {...mood, color: 'yellow' };
            case 'Bad':
              return {...mood, color: 'orange'};
            case 'Awful':
              return {...mood, color: 'red'};
            default:
              return {...mood, color: '#333'};
          }
        });
        setMoods(moodsColor);

      } catch (error) {
        console.error("Failed to fetch moods");
        setError("Failed to fetch moods");
      }
    };

    fetchMoods();
  }, []); 

  const handleSelectMood = (moodId) => {
    setSelectedMood(moodId);
  };

  const saveInitialMood = async () => {
    if (!selectedMood) {
      setError('Please select a mood to continue.');
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
      navigate('/activities'); 
    } catch (error) {
      console.error('Failed to save mood:', error);
      setError('Failed to save mood. Please try again.');
    }
  };
  
  return (
    <div style={styles.body}>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.moodTracker}>
          <h2>How are you feeling today?</h2>
          {error && <p style={styles.errorText}>{error}</p>}
          <div style={styles.moodOptions}>
            {moods.map((mood) => (
              <button 
                key={mood._id} 
                style={{
                  ...styles.moodButton, 
                  backgroundColor: selectedMood === mood._id ? mood.color : '#333',
                  borderColor: mood.color
                }}
                onClick={() => handleSelectMood(mood._id)}
              >
                {mood.name}
              </button>
            ))}
          </div>
          <button onClick={saveInitialMood} style={styles.continueButton}>Continue</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#f0f2f5',
    color: 'white'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    textAlign: 'center',
  },
  moodTracker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black'
  },
  moodOptions: {
    display: 'inline-flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '70px',
  },
  moodButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '15px 30px',
    border: '7px solid transparent',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.2em',
    transition: 'background-color 0.3s, transform 0.3s, border-color 0.3s ',
  },
  continueButton: {
    marginTop: '70px',
    padding: '10px 20px',
    backgroundColor: '#232423',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2em',
  },
  errorText: {
    color: 'red',
  }
};

export default MoodEntry;