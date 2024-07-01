import express from 'express';
import { spawn } from 'child_process';
import EmotionPrediction from '../models/EmotionPrediction.js'

export const text_classif = async (req, res) => {
    const text = req.body.text;
    const userId = req.body.userId;  
    const timestamp = req.body.timestamp;  

    console.log(text);
    console.log(userId);
    console.log(timestamp);

    const process = spawn('python', ['./AI_model/text_classif_model.py', text]);

    let result = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
        console.log('stdout data:', data.toString());  // Log data for debugging
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        console.error('stderr data:', data.toString());  // Log error data for debugging
        errorOutput += data.toString();
    });

    process.on('close', async (code) => {  // Mark this function as async
        if (errorOutput) {
            console.error(`stderr: ${errorOutput}`);
            res.status(500).send('Error processing the request');
            return;
        }

        try {
            result = result.replace(/'/g, '"');
            const predictions = JSON.parse(result);
            res.json({ message: 'Data processed successfully', data: predictions });
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Error processing the request');
        }
    });
};
