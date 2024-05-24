import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateSelector from './DateSelector';
import TicketPrice from './TicketPrice';
import BookingForm from './BookingForm';
import SeatingPlanViewer from './SeatingPlanViewer';
import axios from 'axios';
import './BookingPage.css';

const dateToPricesMap = {
  '2024-05-20': { 'first-class': 500, 'business-class': 300, 'economy-class': 100 },
  '2024-05-21': { 'first-class': 550, 'business-class': 320, 'economy-class': 120 },
  '2024-05-22': { 'first-class': 530, 'business-class': 310, 'economy-class': 110 },
  '2024-05-23': { 'first-class': 600, 'business-class': 350, 'economy-class': 150 },
  '2024-05-24': { 'first-class': 520, 'business-class': 330, 'economy-class': 130 }
};

function BookingPage({ currentUser, selectedSeats, setSelectedSeats }) {
  const [layout, setLayout] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [showNoSeatsDialog, setShowNoSeatsDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPrices, setCurrentPrices] = useState(dateToPricesMap['2024-05-20']);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [groupSize, setGroupSize] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jl8n1bn2y7.execute-api.eu-north-1.amazonaws.com/dev/seats')
      .then(response => {
        const fetchedSeats = response.data;
        const transformedLayout = transformSeatsToLayout(fetchedSeats);
        setLayout(transformedLayout);
      })
      .catch(error => {
        console.error('There was an error fetching the seats!', error);
      });
  }, []);

  useEffect(() => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    setCurrentPrices(dateToPricesMap[selectedDateString] || dateToPricesMap['2024-05-20']);
  }, [selectedDate]);

  const transformSeatsToLayout = (seats) => {
    const layout = [];
    seats.forEach(seat => {
      const row = seat.seat_row - 1;
      const col = seat.seat_col - 1;
      if (!layout[row]) {
        layout[row] = [];
      }
      layout[row][col] = seat;
    });
    return layout;
  };

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (selectedSeats.length >= 6) {
      alert('You cannot book more than 6 seats at once.');
      return;
    }

    const seat = layout[rowIndex][seatIndex];
    if (seat.status === 'available') {
      const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));

      if (createsSingleGap(updatedLayout, rowIndex, seatIndex)) {
        alert('This seat selection would create a single gap. Please choose another seat.');
        return;
      }

      updatedLayout[rowIndex][seatIndex].status = 'selected';
      setLayout(updatedLayout);
      setSelectedSeats([...selectedSeats, { ...seat, rowIndex, seatIndex }]);
    } else if (seat.status === 'selected') {
      const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
      updatedLayout[rowIndex][seatIndex].status = 'available';
      setLayout(updatedLayout);
      setSelectedSeats(selectedSeats.filter(s => s.rowIndex !== rowIndex || s.seatIndex !== seatIndex));
    }
  };

  const createsSingleGap = (layout, rowIndex, seatIndex) => {
    const row = layout[rowIndex];
    if (seatIndex > 0 && row[seatIndex - 1].status === 'available') {
      if ((seatIndex - 2 >= 0 && row[seatIndex - 2].status !== 'available') || (seatIndex - 2 < 0)) {
        return true;
      }
    }

    if (seatIndex < row.length - 1 && row[seatIndex + 1].status === 'available') {
      if ((seatIndex + 2 < row.length && row[seatIndex + 2].status !== 'available') || (seatIndex + 2 >= row.length)) {
        return true;
      }
    }

    return false;
  };

  const findContiguousBlocks = (layout, groupSize, selectedClass) => {
    const blocks = [];
    layout.forEach((row, rowIndex) => {
      let count = 0;
      let start = -1;
      row.forEach((seat, seatIndex) => {
        if (seat.status === 'available' && seat.seat_class === selectedClass) {
          if (start === -1) {
            start = seatIndex;
          }
          count++;
        } else {
          if (count >= groupSize) {
            blocks.push({ rowIndex, start, count });
          }
          count = 0;
          start = -1;
        }
      });
      if (count >= groupSize) {
        blocks.push({ rowIndex, start, count });
      }
    });
    return blocks;
  };

  const handleGroupBooking = (groupSize) => {
    if (groupSize < 2 || groupSize > 6) {
      alert('You cannot book more than 6 seats at once and group size must be at least 2.');
      return;
    }

    if (selectedSeats.length + groupSize > 6) {
      alert('You cannot book more than 6 seats at once.');
      return;
    }

    if (selectedClass === '') {
      alert('Please select a class for group booking.');
      return;
    }

    const blocks = findContiguousBlocks(layout, groupSize, selectedClass);
    if (blocks.length === 0) {
      alert('No contiguous blocks of seats are available for the group size in the selected class.');
      return;
    }

    const selectedBlock = blocks[0];
    const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
    for (let i = 0; i < groupSize; i++) {
      updatedLayout[selectedBlock.rowIndex][selectedBlock.start + i].status = 'selected';
    }

    setLayout(updatedLayout);
    setSelectedSeats([
      ...selectedSeats,
      ...Array.from({ length: groupSize }, (_, i) => ({
        ...updatedLayout[selectedBlock.rowIndex][selectedBlock.start + i],
        rowIndex: selectedBlock.rowIndex,
        seatIndex: selectedBlock.start + i
      }))
    ]);
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before proceeding to checkout.');
      return;
    }

    const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
    selectedSeats.forEach(({ rowIndex, seatIndex }) => {
      updatedLayout[rowIndex][seatIndex].status = 'locked';
    });

    setLayout(updatedLayout);
    setLockedSeats([...lockedSeats, ...selectedSeats]);

    axios.post('http://localhost:4000/book-seats', { seats: selectedSeats })
      .then(response => {
        setSelectedSeats([]);
        navigate('/register', { state: { selectedSeats, prices: currentPrices, currentUser, selectedDate } });
      })
      .catch(error => {
        console.error('There was an error booking the seats!', error);
      });
  };

  const releaseSeats = (seats) => {
    const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));
    seats.forEach(({ rowIndex, seatIndex }) => {
      updatedLayout[rowIndex][seatIndex].status = 'available';
    });
    setLayout(updatedLayout);
    setLockedSeats(lockedSeats.filter(seat => !seats.includes(seat)));
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleCloseDialog = () => {
    setShowNoSeatsDialog(false);
  };

  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1>Airline Booking System</h1>
      </header>
      <main>
        <div className="row">
          <div className="col-md-4">
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TicketPrice prices={currentPrices} />
            <BookingForm bookingDetails={selectedSeats} />
            <div className="checkout-buttons mt-3">
              <button className="btn btn-success mr-2" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
              <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="group-booking mt-3">
              <label htmlFor="groupSize">Group Size:</label>
              <input
                type="number"
                id="groupSize"
                min="1"
                max="6"
                value={groupSize}
                className="form-control"
                onChange={(e) => setGroupSize(parseInt(e.target.value))}
              />
              {groupSize > 1 && (
                <>
                  <label htmlFor="selectedClass" className="mt-2">Class:</label>
                  <select
                    id="selectedClass"
                    value={selectedClass}
                    className="form-control"
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    <option value="first-class">First Class</option>
                    <option value="business-class">Business Class</option>
                    <option value="economy-class">Economy Class</option>
                  </select>
                  <button className="btn btn-primary mt-2" onClick={() => handleGroupBooking(groupSize)}>Book Group</button>
                </>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <SeatingPlanViewer layout={layout} onSeatClick={handleSeatClick} />
          </div>
          {showNoSeatsDialog && (
            <div className="dialog-overlay">
              <div className="dialog">
                <p>No seats available in the selected class.</p>
                <button className="btn btn-primary" onClick={handleCloseDialog}>Close</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookingPage;
