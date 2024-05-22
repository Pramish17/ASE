import React from 'react';

const DateSelector = ({ dates, selectedDate, setSelectedDate }) => {
  return (
    <div className="date-selector mb-4">
      <label htmlFor="dateSelect" className="form-label">Select Date:</label>
      <select
        id="dateSelect"
        value={selectedDate}
        className="form-select"
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {dates.map((date, index) => (
          <option key={index} value={date}>{date}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
