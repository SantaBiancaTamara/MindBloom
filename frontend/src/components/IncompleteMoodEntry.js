import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
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
      
      console.log(`Bearer ${token}`); // Check the format of the token being sent

      try {
        const response = await axios.get('http://localhost:8080/getMoods', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Assuming the response contains an array of moods
        setMoods(response.data);
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
    console.log(('Continue button clicked'));

    if (!selectedMood) {
      console.log('No mood selected');
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
      console.log('Mood saved, response: ',response);

      const entryId = response.data._id;
      localStorage.setItem('entryId', entryId);
      navigate('/activities'); // Redirect to activities page after saving
    } catch (error) {
      console.error('Failed to save mood:', error);
      setError('Failed to save mood. Please try again.');
    }
  };
  

  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mood-options">
        {moods.map((mood) => (
          <div key={mood._id} className="mood-option">
            <input
              type="radio" // Changed from checkbox to radio for single selection
              id={mood._id}
              name="mood"
              value={mood._id}
              checked={selectedMood === mood._id}
              onChange={() => handleSelectMood(mood._id)}
            />
            <label htmlFor={mood._id}>
              <span role="img" aria-label={mood.name}>{mood.emoji}</span>
              {mood.name}
            </label>
          </div>
        ))}
      </div>
      <button onClick={saveInitialMood}>Continue</button> {/* Attach the saveInitialMood function */}
    </div>
  );
}


export default Home;
