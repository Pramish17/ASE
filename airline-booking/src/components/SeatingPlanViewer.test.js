import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SeatingPlanViewer from './SeatingPlanViewer';

describe('SeatingPlanViewer', () => {
  it('renders correctly', () => {
    const layout = [
      [
        { seat_label: 'A1', status: 'available', seat_class: 'economy' },
        { seat_label: 'A2', status: 'booked', seat_class: 'economy' },
      ],
      [
        { seat_label: 'B1', status: 'available', seat_class: 'business' },
        { seat_label: 'B2', status: 'booked', seat_class: 'business' },
      ],
    ];

    const { getByText } = render(<SeatingPlanViewer layout={layout} onSeatClick={() => {}} />);

    expect(getByText('A1')).toBeInTheDocument();
    expect(getByText('A2')).toBeInTheDocument();
    expect(getByText('B1')).toBeInTheDocument();
    expect(getByText('B2')).toBeInTheDocument();
  });

  it('calls onSeatClick when a seat is clicked', () => {
    const layout = [[{ seat_label: 'A1', status: 'available', seat_class: 'economy' }]];
    const onSeatClick = jest.fn();

    const { getByText } = render(<SeatingPlanViewer layout={layout} onSeatClick={onSeatClick} />);

    fireEvent.click(getByText('A1'));

    expect(onSeatClick).toHaveBeenCalledWith(0, 0);
  });
});