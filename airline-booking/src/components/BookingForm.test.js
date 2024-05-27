import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  test('renders "No seats selected." when bookingDetails is empty', () => {
    render(<BookingForm bookingDetails={[]} />);
    expect(screen.getByText('No seats selected.')).toBeInTheDocument();
  });

  test('renders booking details when bookingDetails is not empty', () => {
    const bookingDetails = [
      { seat_label: 'A-1', seat_class: 'Economy-Class' },
      { seat_label: 'B-2', seat_class: 'Business-Class' },
    ];
    render(<BookingForm bookingDetails={bookingDetails} />);
    expect(screen.getByText('A 1 - Economy Class')).toBeInTheDocument();
    expect(screen.getByText('B 2 - Business Class')).toBeInTheDocument();
  });

  test('renders "Unknown Seat" when seat_label is not provided', () => {
    const bookingDetails = [{ seat_class: 'Economy-Class' }];
    render(<BookingForm bookingDetails={bookingDetails} />);
    expect(screen.getByText('Unknown Seat - Economy Class')).toBeInTheDocument();
  });
});