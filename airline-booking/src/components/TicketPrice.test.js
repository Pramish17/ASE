import React from 'react';
import { render } from '@testing-library/react';
import TicketPrice from './TicketPrice';

test('renders ticket prices correctly', () => {
  const prices = {
    'first-class': 500,
    'business-class': 300,
    'economy-class': 100
  };

  const { getByText } = render(<TicketPrice prices={prices} />);

  expect(getByText('Ticket Prices:')).toBeInTheDocument();
  expect(getByText('First Class: $500')).toBeInTheDocument();
  expect(getByText('Business Class: $300')).toBeInTheDocument();
  expect(getByText('Economy Class: $100')).toBeInTheDocument();
});