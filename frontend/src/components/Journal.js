import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Journal.css'; // Import the CSS file

const Journal = () => {
  const [content, setContent] = useState('');
  const [emotions, setEmotions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem('token');
  const selectedDate = localStorage.getItem('date');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('No date selected');
      return;
    }

    const timestamp = new Date(selectedDate).toISOString();

    try {
      const response = await axios.post('http://localhost:8080/insertJournal', {
        content,
        timestamp,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Content saved:', response.data);
      alert('Journal saved successfully!');
      setEmotions(response.data.emotions || []);
      setIsSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error('Failed to save journal:', error);
      alert('Failed to save journal.');
    }
  };

  const handleNewEntry = () => {
    setContent('');
    setEmotions([]);
    setIsSubmitted(false);
  };

  return (
    <div className="journal-page">
      <div className="journal-container">
        <h1>My Journal</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            rows="10"
            cols="50"
            disabled={isSubmitted} // Disable textarea after submission
          ></textarea>
          <br />
          {!isSubmitted && <button type="submit">Submit</button>}
          {isSubmitted && <button type="button" onClick={handleNewEntry}>New Entry</button>}
        </form>
      </div>
      {emotions.length > 0 && (
        <div className="emotions-container">
          <h2>Detected Emotions</h2>
          <ul>
            {emotions.map((emotion, index) => (
              <li key={index}>
                {emotion.label}: {Math.round(emotion.score * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Journal;
