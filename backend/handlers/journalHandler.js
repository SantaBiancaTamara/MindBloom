// backend/handlers/journalHandler.js
import mongoose from 'mongoose';
import Journal from '../models/Journal.js';
import express from 'express';
import { text_classif } from '../handlers/classif_handler.js' // Import the Flask handler

export const insertJournal = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;  // Set by your authentication middleware
  
    if (!content) {
      return res.status(400).send("Content is required");
    }
  
    const date = new Date();  // Use current date and time
  
    try {
      console.log('Classifying text:', content);
      const emotions = await text_classif(content);
      console.log('Emotions received:', emotions);
  
      // Validate emotions
      if (!Array.isArray(emotions) || emotions.length === 0 || !emotions.every(e => e.label && e.score)) {
        throw new Error('Invalid emotions format');
      }
  
      // Create a new journal entry with the current timestamp
      const newJournal = new Journal({ content, timestamp: date, userId, emotions });
      await newJournal.save();
      res.status(201).json(newJournal);
    } catch (error) {
      console.error('Error in insertJournal:', error);
      res.status(500).send("Error saving the journal");
    }
  };


export const getJournalsByDate = async (req, res) => {
    const userId = req.userId;
    const { date } = req.params;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    try {
        const journals = await Journal.find({
            userId: userId,
            timestamp: {
                $gte: startDate,
                $lt: endDate
            }
        });

        if (journals.length > 0) {
            res.status(200).json(journals);
        } else {
            res.status(404).json({ message: "No journals found for this date" });
        }
    } catch (error) {
        console.error('Error fetching journals:', error);
        res.status(500).send("Error fetching the journals");
    }
};

export const getAllJournals = async(req,res) => {
    try{
        const journals = await Journal.find({})
        res.json(journals);
    } catch (error){
        console.error('Error retrieving journals', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getJournal = async (req, res) => {
    const userId = req.userId;
    const { timestamp } = req.params;

    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    try {
        const existingJournal = await Journal.findOne({
            userId: userId,
            timestamp: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingJournal) {
            res.status(200).json(existingJournal);
        } else {
            res.status(404).json({ message: "No content found for this date" });
        }
    } catch (error) {
        console.error('Error fetching journal:', error);
        res.status(500).send("Error fetching the journal");
    }
};

export const getJournalById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId; // Get user ID from token

    try {
        const journal = await Journal.findOne({ _id: id, userId: userId });
        if (journal) {
            res.status(200).json(journal);
        } else {
            res.status(404).json({ message: "Journal not found" });
        }
    } catch (error) {
        console.error('Error fetching journal by ID:', error);
        res.status(500).send("Error fetching the journal");
    }
};
