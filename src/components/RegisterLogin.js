import React, { useState } from 'react';
import axios from 'axios';

function RegisterLogin({ onLoginSuccess }) {
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`http://localhost:5000/register`, { role });
      alert(`Registered as ${role}`);
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post(`http://localhost:5000/login`);
      alert('Login successful');
      onLoginSuccess();
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="researcher">Researcher</option>
        <option value="doctor">Doctor</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default RegisterLogin;