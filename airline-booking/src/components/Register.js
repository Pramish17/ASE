import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ username: '', password: '', fullName: '', age: '', email: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats, prices, currentUser } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
    navigate('/login', { state: { selectedSeats, prices, currentUser } });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p>Already registered? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;
