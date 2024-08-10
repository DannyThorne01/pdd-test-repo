
// import './App.css';
import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [receive, setReceived] = useState<string>('');
  const [send, setSend] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/message', { // turn this into api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      console.log(send)
      const data = await res.json();
      console.log(data)
      setSend(true);
      console.log(send);
      setResponse(data.message);
    } catch (error) {
      setResponse('Error sending message');
    }
  };

  const fetchMessage = async () =>{
    try {
      const response = await fetch('http://localhost:8080/data') 
      let json_object = await response.json()
      console.log(json_object.message)
      setReceived(json_object.message)
    }catch (error) {
      console.error('Error fetching data from Express:', error);
    }
    setSend(false);
  }

  useEffect(() => {
    fetchMessage();
    console.log("aye");
  },[send]);


  return (
    <div>
      <div>
        <h1>Message from Flask (via Express):</h1>
        <p>{receive}</p>
      </div>
      <h1>Send a Message</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default App;
