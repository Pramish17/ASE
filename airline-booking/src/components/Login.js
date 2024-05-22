import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
