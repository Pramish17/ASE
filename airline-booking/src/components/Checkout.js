import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats = [], prices = {}, selectedDate } = location.state || {};
  const [showDialog, setShowDialog] = useState(false);

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

  const handleConfirmAndPay = () => {
    setShowDialog(true);
  };

  const handleGoToDashboard = () => {
    navigate('/'); 
  };

  const handleGoBackToBooking = () => {
    navigate('/booking'); 
  };

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
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Selected Date</h5>
            <p className="card-text">{selectedDate ? selectedDate.toISOString().split('T')[0] : 'No date selected'}</p>
          </div>
        </div>
      </div>
      <div className="total-price">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Total Price</h5>
            <p className="card-text">Your total price is <strong>${totalPrice.toFixed(2)}</strong>.</p>
            <button className="btn btn-primary btn-block" onClick={handleConfirmAndPay}>Confirm and Pay</button>
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h4>Ticket Issued</h4>
            <p>Your ticket has been issued successfully with the following details:</p>
            <ul className="list-group list-group-flush">
              {selectedSeats.map((seat, index) => (
                <li key={index} className="list-group-item">
                  <strong>{seat.seat_label ? seat.seat_label.replace(/-/g, ' ') : 'Unknown Seat'}</strong> - {seat.seat_class.replace(/-/g, ' ')}
                </li>
              ))}
            </ul>
            <p className="card-text mt-3"><strong>Date: {selectedDate ? selectedDate.toISOString().split('T')[0] : 'No date selected'}</strong></p>
            <p className="card-text mt-3"><strong>Total Price: ${totalPrice.toFixed(2)}</strong></p>
            <div className="dialog-buttons">
              <button className="btn btn-secondary mr-2" onClick={handleGoBackToBooking}>Go back to Booking</button>
              <button className="btn btn-primary" onClick={handleGoToDashboard}>Go to Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
