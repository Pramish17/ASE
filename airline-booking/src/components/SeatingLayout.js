import React from 'react';
import '../styles/SeatingLayout.css';

const SeatingLayout = ({ layout, onSeatClick }) => {
  return (
    <div className="seating-layout">
      {layout.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat, seatIndex) => (
            <div
              key={seatIndex}
              className={`seat ${seat.type} ${seat.status}`}
              onClick={() => onSeatClick(rowIndex, seatIndex)}
            >
              {seat.label && <span>{seat.label}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatingLayout;
