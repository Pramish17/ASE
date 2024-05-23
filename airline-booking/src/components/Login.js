import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = ({ users, onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, prices, selectedDate, currentUser } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === form.username && u.password === form.password);
    if (user) {
      onLogin(user);
      navigate('/checkout', { state: { selectedSeats, prices, selectedDate, user } });
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register', { state: { selectedSeats, prices, selectedDate, currentUser } });
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
