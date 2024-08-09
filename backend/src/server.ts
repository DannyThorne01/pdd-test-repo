// // backend/src/index.ts
const {express} = require('express');
const {cors} = require('cors');
const {getMessage} = require("../dist/controllers/testerController.ts");
// import { getMessage, postMessage} from "./controllers/testerController";

// const {getMessage, postMessage} = require("./testerController")
 
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
// app.post('/message', postMessage)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const appName = "Server API"; 
// const port = process.env.PORT || 8080;
// const serverInit = require("./server");
// const server = serverInit();
// server.listen(port, () => console.log(`${appName} running on port ${port}!`));