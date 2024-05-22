import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartBooking = () => {
    navigate('/booking');
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Airline Booking System</h1>
        <p>Your journey starts here</p>
        <button className="btn btn-primary" onClick={handleStartBooking}>Start Booking</button>
      </header>
      <section className="homepage-features">
        <div className="feature">
          <i className="fas fa-plane-departure"></i>
          <h3>Easy Booking</h3>
          <p>Book your flights with ease and convenience.</p>
        </div>
        <div className="feature">
          <i className="fas fa-clock"></i>
          <h3>24/7 Support</h3>
          <p>We are here to assist you round the clock.</p>
        </div>
        <div className="feature">
          <i className="fas fa-dollar-sign"></i>
          <h3>Best Prices</h3>
          <p>Get the best deals on flight tickets.</p>
        </div>
      </section>
      <footer className="homepage-footer">
        <p>&copy; 2024 Airline Booking System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
