import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import Register from './components/Register';
import Login from './components/Login';
import Checkout from './components/Checkout';
import './App.css';

const prices = {
  firstClass: 500,
  businessClass: 300,
  economyClass: 100
};

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleRegister = (user) => {
    setRegisteredUsers([...registeredUsers, user]);
    setCurrentUser(user);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage currentUser={currentUser} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/checkout" element={<Checkout currentUser={currentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
