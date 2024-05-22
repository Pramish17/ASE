import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats = [], prices = {}, user = null } = location.state || {};

  const getTotalPrice = () => {
    let total = 0;
    selectedSeats.forEach(seat => {
      let price = 0;
      if (seat.type === 'first-class') {
        price = prices.firstClass;
      } else if (seat.type === 'business-class') {
        price = prices.businessClass;
      } else if (seat.type === 'economy-class') {
        price = prices.economyClass;
      }

      if (user && user.age <= 15) {
        price *= 0.75; // Apply 25% discount
      }

      total += price;
    });
    return total;
  };

  const handleBackToBooking = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    alert(`Ticket issued successfully to ${user ? user.fullName : 'Guest'}.\nTotal Price: $${getTotalPrice().toFixed(2)}`);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <p>Selected Seats:</p>
      <ul>
        {selectedSeats.map((seat, index) => (
          <li key={index}>{seat.label} ({seat.type.replace('-', ' ')})</li>
        ))}
      </ul>
      <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
      <button className="btn btn-success" onClick={handleCheckout}>Confirm and Pay</button>
      <button className="btn btn-primary" onClick={handleBackToBooking}>Back to Booking</button>
    </div>
  );
};

export default Checkout;
