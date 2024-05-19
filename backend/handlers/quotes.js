import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const API_KEY = 'today'; // Use environment variables in production
const API_URL = `https://zenquotes.io/api/quotes/${API_KEY}`;

export const fetchQuotes = async(req,res) => {
    try {
        const response = await fetch(API_URL);
        const quotes = await response.json();
        res.json(quotes);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
        res.status(500).send('Failed to fetch quotes');
      }
}


export default fetchQuotes;
