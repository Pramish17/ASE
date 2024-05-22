import React from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { selectedSeats = [], prices = {} } = location.state || {};

  console.log('Selected Seats:', selectedSeats);
  console.log('Prices:', prices);

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const seatClass = seat.seat_class.toLowerCase().replace(/\s+/g, '-');
      const price = prices[seatClass];

      console.log('Seat Class:', seatClass);
      console.log('Seat Price:', price);

      if (!price) {
        console.error(`Price not found for seat class: ${seatClass}`);
      }

      return total + (price || 0);
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="checkout container mt-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="selected-seats mb-4">
        <h4>Booking Summary</h4>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Selected Seats</h5>
            <ul className="list-group list-group-flush">
              {selectedSeats.map((seat, index) => (
                <li key={index} className="list-group-item">
                  <strong>{seat.seat_label ? seat.seat_label.replace(/-/g, ' ') : 'Unknown Seat'}</strong> - {seat.seat_class.replace(/-/g, ' ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="total-price">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Price</h5>
            <p className="card-text">Your total price is <strong>${totalPrice.toFixed(2)}</strong>.</p>
            <button className="btn btn-primary btn-block">Confirm and Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
