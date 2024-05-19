import React, { useState, useEffect } from 'react';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue.');
          return;
        }
        try {
          const response = await fetch('http://localhost:8080/fetchQuotes', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setQuotes(data);
          } else {
            throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error fetching quotes:', error);
          setError(error.message); // Set the error message here
        }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <h1>Inspirational Quotes</h1>
      {error && <p className="error">{error}</p>}  {/* Display the error message here */}
      {quotes.length > 0 ? (
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>
              "{quote.q}" - {quote.a}
            </li>
          ))}
        </ul>
      ) : !error && <p>No quotes available.</p>}  {/* Show this message only if there's no error */}
    </div>
  );
}

export default Quotes;
