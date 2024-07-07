// import { spawn } from 'child_process';

// export const text_classif = async (req, res) => {
//     const text = req.body.text;
//     const userId = req.body.userId;  
//     const timestamp = req.body.timestamp;  

//     console.log(text);
//     console.log(userId);
//     console.log(timestamp);

//     const process = spawn('python', ['./AI_model/text_classif_model.py', text]);

//     let result = '';
//     let errorOutput = '';

//     process.stdout.on('data', (data) => {
//         console.log('stdout data:', data.toString()); 
//         result += data.toString();
//     });

//     process.stderr.on('data', (data) => {
//         console.error('stderr data:', data.toString()); 
//         errorOutput += data.toString();
//     });

//     process.on('close', async (code) => {  
//         if (errorOutput) {
//             console.error(`stderr: ${errorOutput}`);
//             res.status(500).send('error while processing the request');
//             return;
//         }

//         try {
//             result = result.replace(/'/g, '"');
//             const predictions = JSON.parse(result);
//             res.json({ message: 'Data processed successfully', data: predictions });
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//             res.status(500).send('error while parsing the JSON');
//         }
//     });
// };

// backend/flaskHandler.js
import axios from 'axios';

export const text_classif = async (text) => {
  try {
    const response = await axios.post('http://localhost:8081/classify', { text });
    console.log(response.data);
    return response.data[0]; // Extract the inner array directly
  } catch (error) {
    console.error('Error classifying text:', error.response ? error.response.data : error.message);
    throw new Error('Error classifying text');
  }
};

export const classifyTextHandler = async (req, res) => {
  const { text } = req.body;
  try {
    const result = await text_classif(text);
    res.json(result);
  } catch (error) {
    console.error('Error classifying text:', error);
    res.status(500).send('Internal Server Error');
  }
};
