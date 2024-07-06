import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Ensure this path is correct
import '../styles/Quotes.css'; // Ensure this path is correct

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
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

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
  };

  return (
    <NavBar>
      <div className="quotes-page">
        <h1>Inspirational Quotes</h1>
        {error && <p className="error">{error}</p>} {/* Display the error message here */}
        {quotes.length > 0 ? (
          <div className="quote-container">
            <button className="nav-button" onClick={handlePreviousQuote} disabled={quotes.length <= 1}>{"<"}</button>
            <div className="quote-text">
              <p>"{quotes[currentQuoteIndex].q}"</p>
              <p>- {quotes[currentQuoteIndex].a}</p>
            </div>
            <button className="nav-button" onClick={handleNextQuote} disabled={quotes.length <= 1}>{">"}</button>
          </div>
        ) : !error && <p>No quotes available.</p>} {/* Show this message only if there's no error */}
      </div>
    </NavBar>
  );
}

export default Quotes;
