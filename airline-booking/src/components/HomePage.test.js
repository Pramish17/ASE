import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomePage', () => {
  test('renders HomePage component without crashing', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  test('contains correct text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome to Airline Booking System')).toBeInTheDocument();
    expect(screen.getByText('Your journey starts here')).toBeInTheDocument();
    expect(screen.getByText('Start Booking')).toBeInTheDocument();
    expect(screen.getByText('Easy Booking')).toBeInTheDocument();
    expect(screen.getByText('24/7 Support')).toBeInTheDocument();
    expect(screen.getByText('Best Prices')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Airline Booking System. All rights reserved.')).toBeInTheDocument();
  });

  test('navigates to /booking when Start Booking button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Start Booking'));
    expect(mockNavigate).toHaveBeenCalledWith('/booking');
  });
});