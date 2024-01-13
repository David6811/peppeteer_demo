import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      setMessage('Please enter both username and password.');
    } else {
      setMessage(`Welcome back, ${username}!`);
    }
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <label>{message}</label>
    </div>
  );
}

export default App;
