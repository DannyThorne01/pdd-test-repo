
import express from "express";
import cors from "cors";
import { getMessage, postMessage} from "./controllers/testerController";

 
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

app.get('/message', getMessage)
app.post('/message', postMessage)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
