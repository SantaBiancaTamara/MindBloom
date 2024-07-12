import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; // Import the NavBar component
import '../styles/Journal.css'; // Import the CSS file

const Journal = () => {
  const [content, setContent] = useState('');
  const [emotions, setEmotions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem('token');
  const selectedDate = localStorage.getItem('selectedDate');
  const maxWords = 150;
  const maxCharacters = 1600; // Approximate character limit for practical purposes

  console.log(selectedDate);

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
        headers: {
           Authorization: `Bearer ${token}`
         }
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

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= maxCharacters) {
      setContent(newContent);
    }
  };

  const wordCount = content.trim().split(/\s+/).length;

  return (
    <NavBar>
      <div className="journal-page">
        <div className="journal-container">
          <h1>My Journal</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Write something here..."
              rows="10"
              cols="50"
              disabled={isSubmitted} 
            ></textarea>
            <div className="count-info">
              <div className="word-count">
                {wordCount}/{maxWords} words
              </div>
              <div className="char-count">
                {content.length}/{maxCharacters} characters
              </div>
            </div>
            {!isSubmitted && <button type="submit" disabled={wordCount > maxWords}>Submit</button>}
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
    </NavBar>
  );
};

export default Journal;
