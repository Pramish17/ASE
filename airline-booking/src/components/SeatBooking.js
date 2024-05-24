import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatBooking = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get('https://jl8n1bn2y7.execute-api.eu-north-1.amazonaws.com/dev/seats')
      .then(response => {
        setSeats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the seats!', error);
      });
  }, []);

  return (
    <div>
      <h1>Seat Booking</h1>
      <ul>
        {seats.map(seat => (
          <li key={seat.id}>
            {seat.seat_label} - {seat.seat_class} - {seat.status} - Row: {seat.seat_row}, Col: {seat.seat_col}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatBooking;
