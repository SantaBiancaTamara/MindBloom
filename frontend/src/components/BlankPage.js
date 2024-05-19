import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlankPage = () => {
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');
  const selectedDate = localStorage.getItem('date');

  // Effect to load existing content for the selected date
  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedDate) {
        console.error('No date selected');
        setContent('');
        return;
      }

      const timestamp = new Date(selectedDate).toISOString();
      try {
        const response = await axios.get(`http://localhost:8080/getBlankPage/${timestamp}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          setContent(response.data.content);
        } else {
          setContent('');
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setContent('');
      }
    };

    fetchContent();
  }, [selectedDate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('No date selected');
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
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note.');
    }
  };

  return (
    <div>
      <h1>My Blank Page</h1>
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
  );
};

export default BlankPage;
