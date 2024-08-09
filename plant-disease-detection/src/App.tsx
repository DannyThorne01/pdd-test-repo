
// import './App.css';
import React, { useState, useEffect } from 'react';


const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [receive, setReceived] = useState<string>('');

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
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('Error sending message');
    }
  };

  useEffect(() => {
    const fetchMessage = async () =>{
      try {
        const response = await fetch('http://localhost:8080/data',{
          method: 'GET'
        }) 
        let json_object = await response.json()
        setReceived(json_object.message)
        // window.location.reload();
        
      }catch (error) {
        console.error('Error fetching data from Express:', error);
      }
    };
    fetchMessage();
  },[]);
  console.log(receive);
  // window.location.reload();
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
