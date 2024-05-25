import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ username: '', password: '', fullName: '', email: '' });
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
      const response = await axios.post('https://jl8n1bn2y7.execute-api.eu-north-1.amazonaws.com/dev/register', form);
      if (response.status === 201) {
        onRegister(response.data.user);
        navigate('/login', { state: { selectedSeats, prices, selectedDate } });
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      alert('Registration failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login', { state: { selectedSeats, prices, selectedDate } });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
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
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="fullName" 
            value={form.fullName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="login-link mt-3">
        <p>
          Already registered? <button onClick={handleLoginRedirect} className="btn btn-link">Proceed to Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
