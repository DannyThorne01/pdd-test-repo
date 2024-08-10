
import express from "express";
import cors from "cors";
import { getMessage, postMessage, receiveMessage, sendData} from "./controllers/testerController";

const app = express();
const router = express.Router();

// Configure CORS
app.use(cors({
  origin:'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to handle cookies or authentication
}));

router.use(cors({
  origin:'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to handle cookies or authentication
}));

// Middleware to parse JSON requests
app.use(express.json());
router.use(express.json());
const port = process.env.PORT || 8080;

router.get('/message', getMessage)
router.post('/message', postMessage)
router.post('/notify', receiveMessage)
router.get('/data', sendData)

app.use(router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
