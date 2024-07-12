import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; 
import '../styles/Note.css'; 

const Note = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const selectedDate = localStorage.getItem('selectedDate');

  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedDate) {
        console.error('No date selected');
        setContent('');
        setError('No date selected');
        return;
      }

      const timestamp = new Date(selectedDate).toISOString();
      console.log(timestamp);
      try {
        const response = await axios.get('http://localhost:8080/getNote', {
          params: { timestamp }, 
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data && response.data.content) {
          setContent(response.data.content);
          setError('');
        } else {
          setContent('');
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setContent('');
        setError('Failed to fetch content.');
      }
    };

    fetchContent();
  }, [selectedDate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError('No date selected');
      return;
    }

    const timestamp = new Date(selectedDate).toISOString();

    try {
      const response = await axios.post('http://localhost:8080/insertOrUpdateNote', {
        content,
        timestamp,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Content saved:', response.data);
      setError('');
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Failed to save note:', error);
      setError('Failed to save note.');
    }
  };

  return (
    <NavBar>
      <div className="note-page">
        <h1>My Note</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            rows="10"
            cols="50"
          ></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </NavBar>
  );
};

export default Note;
