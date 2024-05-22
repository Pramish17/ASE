import React from 'react';

const BookingForm = ({ bookingDetails }) => {
  return (
    <div className="booking-form">
      <h3>Booking Details</h3>
      {bookingDetails.length === 0 ? (
        <p>No seats selected.</p>
      ) : (
        <ul>
          {bookingDetails.map((seat, index) => (
            <li key={index}>
              Seat: {seat.label}, Class: {seat.type.replace('-', ' ')}, Row: {seat.rowIndex + 1}, Column: {seat.seatIndex + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingForm;
