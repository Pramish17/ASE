import React from 'react';
import '../styles/DateSelector.css';

const DateSelector = ({ dates, selectedDate, setSelectedDate }) => {
  return (
    <div className="date-selector card p-3 shadow mb-4">
      <h3 className="card-title">Select a Date</h3>
      <select className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
