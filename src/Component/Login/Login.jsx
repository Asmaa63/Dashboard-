import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    
    console.log('Sending login parameters:', { email, password }); 
    
    try {
      const response = await fetch(`http://plantify.runasp.net/api/Dashboard/admin?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        console.log('HTTP status:', response.status);
        const errorData = await response.json();
        console.log('Error response data:', errorData); 
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/DashboardMain');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-home-page'>
      <div className="container-login">
        <input type="checkbox" name="" id="flip" />
        <div className="cover-form">
          <div className="front">
            <img src={require("./login.jpg").default} alt="Login" />
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <div className="input-boxes">
                <div className="inputss">
                  <div className="input-box">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      placeholder='Enter Your Email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      placeholder='Enter Your Password'
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;