// // backend/src/index.ts
import express from 'express';
import cors from 'cors';


const corsOptions ={
   origin:'*', 
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();

// Configure CORS
app.use(cors({
  origin:'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to handle cookies or authentication
}));

// Middleware to parse JSON requests
app.use(express.json());
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScriptkgilyugiugliuygliu');
});
app.post('/message', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send({ response: 'No message received' });
  }

  res.send({ response: `Message received: ${message}` });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const appName = "Server API"; 
// const port = process.env.PORT || 8080;
// const serverInit = require("./server");
// const server = serverInit();
// server.listen(port, () => console.log(`${appName} running on port ${port}!`));