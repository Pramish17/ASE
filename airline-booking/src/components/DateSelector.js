import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="date-selector">
      <h4>Select a Date</h4>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        className="form-control"
        minDate={new Date()} // Set the minimum selectable date to today's date
      />
    </div>
  );
};

export default DateSelector;
