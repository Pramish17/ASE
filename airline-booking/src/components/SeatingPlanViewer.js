import React from 'react';
import './SeatingPlanViewer.css';

const SeatingPlanViewer = ({ layout, onSeatClick }) => {
  return (
    <div className="seating-plan">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat, seatIndex) => (
            <div
              key={seatIndex}
              className={`seat ${seat.status} ${seat.seat_class}`}
              onClick={() => onSeatClick(rowIndex, seatIndex)}
            >
              {seat.seat_label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatingPlanViewer;
