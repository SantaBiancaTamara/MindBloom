import axios from 'axios';

const aiModelUrl = process.env.AI_MODEL_URL || 'http://localhost:8081';

export const text_classif = async (text) => {
  try {
    const response = await axios.post(`${aiModelUrl}/classify`, { text });
    console.log(response.data);
    return response.data[0]; 
  } catch (error) {
    console.error('error while classifying text:', error.response ? error.response.data : error.message);
    throw new Error('Text classification failed');
  }
};




