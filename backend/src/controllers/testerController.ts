import { Request, Response } from 'express';
import axios from 'axios'; 

let latestDataFromFlask: any = null; // Store the latest data received from Flask

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

export const receiveMessage = (req: Request, res: Response) => {
  console.log('Incoming request to /receive-data');
  console.log('Request body:', req.body);

  if (!req.body) {
    console.log('No body received');
    return res.status(400).send({ status: 'No data received' });
  }
  latestDataFromFlask  = req.body;
  
  console.log('Received notification from Flask: ', latestDataFromFlask);
  res.send({ status: 'Notification received', latestDataFromFlask });
};

export const sendData = (req: Request, res: Response) => {
  if (latestDataFromFlask) {
    res.json(latestDataFromFlask);  // Send the stored data to the frontend
  } else {
    res.status(404).json({ message: 'No data received from Flask yet' });
  }
}; 

