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
              className={`seat ${seat.status} ${seat.type}`}
              onClick={() => seat.status === 'available' && onSeatClick(rowIndex, seatIndex)}
            >
              {seat.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatingPlanViewer;
