import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateSelector from './DateSelector';

describe('DateSelector', () => {
  test('renders DateSelector component', () => {
    const setSelectedDate = jest.fn();
    const { getByText } = render(<DateSelector selectedDate={new Date()} setSelectedDate={setSelectedDate} />);

    expect(getByText('Select a Date')).toBeInTheDocument();
  });

  test('renders DatePicker component', () => {
    const setSelectedDate = jest.fn();
    const { getByRole } = render(<DateSelector selectedDate={new Date()} setSelectedDate={setSelectedDate} />);

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  test('changes input value on date change', () => {
    const setSelectedDate = jest.fn();
    const { getByRole } = render(<DateSelector selectedDate={new Date()} setSelectedDate={setSelectedDate} />);

    fireEvent.change(getByRole('textbox'), { target: { value: '2024-05-20' } });

    expect(getByRole('textbox').value).toBe('2024-05-20');
  });
});