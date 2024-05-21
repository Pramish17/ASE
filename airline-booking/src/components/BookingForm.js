import React from 'react';
import '../styles/BookingForm.css';

const BookingForm = ({ bookingDetails }) => {
  return (
    <div className="booking-form card p-3 shadow mb-4">
      <h3 className="card-title">Booking Details</h3>
      {bookingDetails.length > 0 ? (
        <div>
          <p><strong>Class:</strong> {bookingDetails[0].type.replace('-', ' ')}</p>
          <p><strong>Number of Seats:</strong> {bookingDetails.length}</p>
          <p><strong>Seats:</strong> {bookingDetails.map(seat => seat.label).join(', ')}</p>
        </div>
      ) : (
        <p>No seats booked yet.</p>
      )}
    </div>
  );
};

export default BookingForm;
