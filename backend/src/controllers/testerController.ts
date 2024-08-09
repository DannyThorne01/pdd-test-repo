import { Request, Response } from 'express';
import axios from 'axios'; 

export const getMessage = (req: Request, res: Response) => {
  res.send('Use a POST request to send a message.');
};

export const postMessage = async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    console.log('No message received');
    return res.status(400).send({ response: 'No message received' });
  }

  try {
    console.log('Sending message to Flask API:', message);
    const flaskRes = await axios.post('http://localhost:4000/process', { message });
    console.log('Received response from Flask API:', flaskRes.data);
    res.send(flaskRes.data);
  } catch (error) {
    console.error('Error communicating with Flask API:', error);
    res.status(500).send({ response: 'Error communicating with Flask API' });
  }
};

