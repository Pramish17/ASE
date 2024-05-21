import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const handleBackToBooking = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <p>Thank you for your booking. Please proceed with the payment.</p>
      <button className="btn btn-primary" onClick={handleBackToBooking}>Back to Booking</button>
    </div>
  );
};

export default Checkout;
