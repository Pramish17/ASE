import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, prices, selectedDate } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jl8n1bn2y7.execute-api.eu-north-1.amazonaws.com/dev/login', form);
      if (response.status === 200 && response.data.message === 'Login successful') {
        const user = response.data.user;
        console.log('Login successful:', user);
        alert('Login successful');
        onLogin(user);
        navigate('/checkout', { state: { selectedSeats, prices, selectedDate, currentUser: user } });
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register', { state: { selectedSeats, prices, selectedDate } });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            className="form-control" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="register-link mt-3">
        <p>
          Need to register? <button onClick={handleRegisterRedirect} className="btn btn-link">Register here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
