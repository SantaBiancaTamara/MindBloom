import mongoose from 'mongoose';
import BlankPage from '../models/BlankPage.js';

export const insertNote = async (req, res) => {
    
    // Correct the destructuring from the request body
    const { content, timestamp } = req.body;  // Ensure this is correctly spelled
    const userId = req.userId;  // Assuming this is set by your authentication middleware

    console.log('Received body:', req.body);
    // Validate that content is provided
    if (!content) {
        return res.status(400).send("Content is required");
    }

    try {
        const newBlankPage = new BlankPage({
            content: content,  // Make sure property names match those in your schema
            timestamp: timestamp ? new Date(timestamp) : new Date(),
            userId: userId
        });

        const savedPage = await newBlankPage.save();
        res.status(201).json(savedPage);
    } catch (error) {
        console.log('Error when saving blank page:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).send("Error saving the blank page");
    }
}

export const getAllBlankPages = async(req,res) => {
    try{
        const blankPages = await BlankPage.find({})
        res.json(blankPages);
    } catch (error){
        console.error('Error retrieving entries', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//for verifications
export const getAllEntries = async(req, res) => {
    try {
      const entries = await Entry.find({})
      res.json(entries);
  
    } catch (error) {
      console.error('Error retrieving entries', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
