import express from 'express'
import { spawn } from 'child_process';

export const text_classif = async(req, res) => {
    const text = req.body.text;

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
    process.on('close', (code) => {
        if (errorOutput) {
            console.error(`stderr: ${errorOutput}`);
            res.status(500).send('Error processing the request');
            return;
        }

        try {
            // Replace single quotes with double quotes for valid JSON
            result = result.replace(/'/g, '"');

            // Parse the JSON result
            const parsedResult = JSON.parse(result);
            res.json(parsedResult);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Error processing the request');
        }
    });
}
