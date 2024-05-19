import mongoose from 'mongoose';
import BlankPage from '../models/BlankPage.js';


export const insertOrUpdateNote = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;  // Assuming this is set by your authentication middleware
    const date = new Date(req.body.timestamp);
    date.setHours(0,0,0,0);

    console.log('Received body:', req.body);

    if (!content) {
        return res.status(400).send("Content is required");
    }

    try {
        const existingPage = await BlankPage.findOne({
            userId: userId,
            timestamp: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingPage) {
            // Append new content to existing page
            existingPage.content += "\n" + content;
            await existingPage.save();
            res.status(200).json(existingPage);
        } else {
            // Create new page
            const newBlankPage = new BlankPage({ content, timestamp: date, userId });
            const savedPage = await newBlankPage.save();
            res.status(201).json(savedPage);
        }
    } catch (error) {
        console.log('Error when saving blank page:', error);
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

export const getBlankPage = async (req, res) => {
    const userId = req.userId;
    const { timestamp } = req.params;

    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    try {
        const existingPage = await BlankPage.findOne({
            userId: userId,
            timestamp: {
                $gte: date,
                $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingPage) {
            res.status(200).json(existingPage);
        } else {
            res.status(404).json({ message: "No content found for this date" });
        }
    } catch (error) {
        console.error('Error fetching blank page:', error);
        res.status(500).send("Error fetching the blank page");
    }
};

