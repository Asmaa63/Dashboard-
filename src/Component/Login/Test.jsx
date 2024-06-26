import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Test() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

   
      const response = await fetch('http://plantify.runasp.net/api/Dashboard/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      // if (!response.ok) {
      //   console.log('HTTP status:', response.status);
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json();
      localStorage.setItem('user-info', JSON.stringify(data));
      console.log('Login successful:', data);
      navigate('/DashboardMain');
    
  };

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/DashboardMain');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Test;
