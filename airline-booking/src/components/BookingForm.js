import React from 'react';

const BookingForm = ({ bookingDetails }) => {
  return (
    <div className="booking-form mb-4">
      <h4>Booking Details:</h4>
      {bookingDetails.length === 0 ? (
        <p>No seats selected.</p>
      ) : (
        <ul className="list-group">
          {bookingDetails.map((detail, index) => (
            <li key={index} className="list-group-item">
              {detail.seat_label ? detail.seat_label.replace(/-/g, ' ') : 'Unknown Seat'} - {detail.seat_class.replace(/-/g, ' ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingForm;
