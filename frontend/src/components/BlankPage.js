import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const BlankPage = () => {
  const location = useLocation();
  const [content, setContent] = useState('');
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
        console.log('Content to be sent:', content);

      const response = await axios.post('http://localhost:8080/insertNote', {
        content,
        timestamp, 
      }, {
        headers: { Authorization: `Bearer ${token}` }  
      });
      console.log(response.data);
      setContent(''); 
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
