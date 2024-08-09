"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// var path = require("path");
// const {getMessage} = require(path.join(__dirname,'controllers/testerController.ts'));
const testerController_1 = require("./controllers/testerController");
// const {getMessage, postMessage} = require("./testerController")
const app = (0, express_1.default)();
// Configure CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to handle cookies or authentication
}));
// Middleware to parse JSON requests
app.use(express_1.default.json());
const port = process.env.PORT || 8080;
app.get('/message', testerController_1.getMessage);
app.post('/message', testerController_1.postMessage);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// const appName = "Server API"; 
// const port = process.env.PORT || 8080;
// const serverInit = require("./server");
// const server = serverInit();
// server.listen(port, () => console.log(`${appName} running on port ${port}!`));
