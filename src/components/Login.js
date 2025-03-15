import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/loginregister.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API for login
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, username, password }),
    });
    const data = await response.json();
    if (data.success) {
      onLogin(data.token, role);
      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <>
      <Helmet>
        {/* Ionicons */}
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

        {/* Normalize.css */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />

        {/* Google Fonts - Poppins */}
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap' />
      </Helmet>

      <div className="screen-1">
        <center>
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="300" viewBox="0 0 640 480" xmlSpace="preserve">
          <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
            <circle style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(61,71,133)' }} cx="0" cy="0" r="40"></circle>
          </g>
          <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
            <circle style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(255,255,255)' }} cx="0" cy="0" r="40"></circle>
          </g>
          <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
            <circle style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(255,255,255)' }} cx="0" cy="0" r="40"></circle>
          </g>
          <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
            <circle style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(255,255,255)' }} cx="0" cy="0" r="40"></circle>
          </g>
          <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
            <polygon style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(255,255,255)' }} points="-50,-50 -50,50 50,50 50,-50 "></polygon>
          </g>
          <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
            <polygon style={{ stroke: 'rgb(0,0,0)', strokeWidth: 0, fill: 'rgb(255,255,255)' }} vectorEffect="non-scaling-stroke" points="-50,-50 -50,50 50,50 50,-50 "></polygon>
          </g>
        </svg>
        </center>

        <form onSubmit={handleSubmit}>
          <div className="sel">
            <label htmlFor="select">Select</label>
            <div className="sec-2">
              <ion-icon name="mail-outline"></ion-icon>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="researcher">Researcher</option>
              <option value="doctor">Doctor</option>
            </select>
            </div>
            </div>

          <div className="email">
            <label htmlFor="username">Username</label>
            <div className="sec-2">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <div className="sec-2">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input className="pas" type="password" name="password" placeholder="············" value={password} onChange={(e) => setPassword(e.target.value)} />
              <ion-icon className='show-hide' name='eye-outline'></ion-icon>
            </div>
          </div>

          <button className='login' type='submit'>Login</button>
        </form>

        {/* <div className='footer'>
          <span><Link to="/register">Sign up here</Link></span>
        </div> */}
      </div>
    </>
  );
};

export default Login;