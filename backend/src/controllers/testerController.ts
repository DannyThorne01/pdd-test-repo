import { Request, Response } from 'express';
import axios from 'axios'; 

let latestDataFromFlask: any = null; // Store the latest data received from Flask

export const getMessage = (req: Request, res: Response) => {
  res.send('Use a POST request to send a message.');
};

export const postMessage = async (req: Request, res: Response) => {
  // POST: Send a POST request with the message to the Flask server
  const { message } = req.body;
  if (!message) {
    console.log('No message received');
    return res.status(400).send({ response: 'No message received' });
  }
  try {
    const flaskRes = await axios.post('http://localhost:4000/process', { message });
    res.send(flaskRes.data.response.response);
  } catch (error) {
    console.error('Error communicating with Flask API:', error);
    res.status(500).send({ response: 'Error communicating with Flask API' });
  }
};

export const receiveMessage = (req: Request, res: Response) => {
  // POST: Receives the return information from the Flask server
  if (!req.body) {
    return res.status(400).send({ status: 'No data received' });
  }
  latestDataFromFlask  = req.body;
  res.send({ status: 'Notification received', 'actual_data':latestDataFromFlask });
};

export const sendData = (req: Request, res: Response) => {
  // GET: Upon request sends the data received from FLASK to frontend
  if (latestDataFromFlask) {
    res.json(latestDataFromFlask);  // Send the stored data to the frontend
  } else {
    res.status(404).json({ message: 'No data received from Flask yet' });
  }
  
}; 

export const postImage = async(req: Request, res: Response) => {
  // POST: Send a POST request with the image to the Flask server
  const formData = req.body
  if (!formData) {
    console.log('No image received');
    return res.status(400).send({ response: 'No image received' });
  }
  try {
    const flaskRes = await axios.post('http://localhost:4000/image', formData, {
      headers: {
                  ...formData.getHeaders()
               }
       });
    res.send(flaskRes)
  } catch (error) {
    console.error('Error sending Image to Flask API:', error);
    res.status(500).send({ response: 'Error sending Image to Flask API' });
  }
}

