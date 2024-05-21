import React from 'react';
import '../styles/SeatingPlanViewer.css';
import SeatingLayout from './SeatingLayout';

const SeatingPlanViewer = ({ layout, onSeatClick }) => {
  return (
    <div className="seating-plan-viewer card p-3 shadow mb-4">
      <h3 className="card-title">Seating Plan</h3>
      <SeatingLayout layout={layout} onSeatClick={onSeatClick} />
    </div>
  );
};

export default SeatingPlanViewer;
