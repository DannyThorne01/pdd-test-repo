# pdd-test-repo
import axios from 'axios';
One alternative to the import module problem : 
  ` var path = require("path");
    const {getMessage} = require(path.join(__dirname,'controllers/testerController.ts'));`
  
Problem Getting Realtime connection between frontend and backend 
NOTE:
const in_message = req.body = { message: 'qe' }
const { message } = req.body = 'qe'

React-Express: Messaged is typed in and when `handleSubmit` is run it calls API `\message` in the Express Server. 

Express-Flask: `router.post('/message', postMessage) --> @app.route('/process', methods=['POST'])
In the route `\message` a POST request is made to `\process`. Passing the message received from the frontend:  { message: <insert_message> }

Flask-Flask: In the route `\process` 'tester_receive_message' will call 'tester_send_message'.
  1. 'tester_send_message' will make API POST to `api\notify`: { message: <insert_message> }
  Here the `api\notify` will terminate returning: 
  { status: 'Notification received', 'actual_data':latestDataFromFlask }

  2. 'tester_send_message' will also terminate and return a nested json consisting of previous termination message: 
  { 'response': json_message, 
    'express_response': { status: 'Notification received', 'actual_data':latestDataFromFlask }
  }
                  
Flask-Express: In route `\process` 'tester_receive_message' will terminate returning a nested json consisting of the above termination message response:
{ 'response': { 'response': json_message, 
                'express_response': { status: 'Notification received',                  'actual_data':latestDataFromFlask }
              }
}

Express-Express: In the route `/message` it will get a response from the POST request like:
{ 'response': { 'response': json_message, 
                'express_response': { status: 'Notification received',                  'actual_data':latestDataFromFlask }
              }
}
It is our job in the express server to break down this response so we can extract the message. So we can just return json_message  which is { message: <insert_message> } 

Express-React: A different frontend function is going to be requesting the data through a useEffect. The route `\data` will send the message: { message: <insert_message> } to front end.

Uploading Images: https://www.geeksforgeeks.org/how-to-upload-image-and-preview-it-using-reactjs/

HSC Code Repo: https://github.com/cornellh4i/human-services-coalition

I ran into a problem: Invalid options object. Dev Server has been initialized using an options object that does not match the API schema. - options.allowedHosts[0] should be a non-empty string.
I fixed it by changing the following line in `package.json` from:
Solution: https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object

Error Setting up DevContainers: [1275 ms] Error: ENOENT: no such file or directory, open '/Users/danielthorne/pdd-test/.devcontainer/plant-disease-detection/Dockerfile' getting this error when opening in devcontainers 
Solution: Was to set the `build` context in the docker-compose.dev.yml in .devcontainers to : "../<name_of_backend/frontend/predict-api>"