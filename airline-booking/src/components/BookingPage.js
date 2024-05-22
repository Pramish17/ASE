import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateSelector from './DateSelector';
import TicketPrice from './TicketPrice';
import BookingForm from './BookingForm';
import SeatingPlanViewer from './SeatingPlanViewer';

const initialLayout = [
  // First Class (3 rows)
  [
    { label: '1A', type: 'first-class', status: 'available' },
    { label: '1B', type: 'first-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '1C', type: 'first-class', status: 'available' },
    { label: '1D', type: 'first-class', status: 'available' }
  ],
  [
    { label: '2A', type: 'first-class', status: 'available' },
    { label: '2B', type: 'first-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '2C', type: 'first-class', status: 'available' },
    { label: '2D', type: 'first-class', status: 'available' }
  ],
  [
    { label: '3A', type: 'first-class', status: 'available' },
    { label: '3B', type: 'first-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '3C', type: 'first-class', status: 'available' },
    { label: '3D', type: 'first-class', status: 'available' }
  ],
  // Business Class (4 rows)
  [
    { label: '4A', type: 'business-class', status: 'available' },
    { label: '4B', type: 'business-class', status: 'available' },
    { label: '4C', type: 'business-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '4D', type: 'business-class', status: 'available' },
    { label: '4E', type: 'business-class', status: 'available' },
    { label: '4F', type: 'business-class', status: 'available' }
  ],
  [
    { label: '5A', type: 'business-class', status: 'available' },
    { label: '5B', type: 'business-class', status: 'available' },
    { label: '5C', type: 'business-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '5D', type: 'business-class', status: 'available' },
    { label: '5E', type: 'business-class', status: 'available' },
    { label: '5F', type: 'business-class', status: 'available' }
  ],
  [
    { label: '6A', type: 'business-class', status: 'available' },
    { label: '6B', type: 'business-class', status: 'available' },
    { label: '6C', type: 'business-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '6D', type: 'business-class', status: 'available' },
    { label: '6E', type: 'business-class', status: 'available' },
    { label: '6F', type: 'business-class', status: 'available' }
  ],
  [
    { label: '7A', type: 'business-class', status: 'available' },
    { label: '7B', type: 'business-class', status: 'available' },
    { label: '7C', type: 'business-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '7D', type: 'business-class', status: 'available' },
    { label: '7E', type: 'business-class', status: 'available' },
    { label: '7F', type: 'business-class', status: 'available' }
  ],
  // Economy Class (12 rows + 1 extra row)
  [
    { label: '8A', type: 'economy-class', status: 'available' },
    { label: '8B', type: 'economy-class', status: 'available' },
    { label: '8C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '8D', type: 'economy-class', status: 'available' },
    { label: '8E', type: 'economy-class', status: 'available' },
    { label: '8F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '9A', type: 'economy-class', status: 'available' },
    { label: '9B', type: 'economy-class', status: 'available' },
    { label: '9C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '9D', type: 'economy-class', status: 'available' },
    { label: '9E', type: 'economy-class', status: 'available' },
    { label: '9F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '10A', type: 'economy-class', status: 'available' },
    { label: '10B', type: 'economy-class', status: 'available' },
    { label: '10C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '10D', type: 'economy-class', status: 'available' },
    { label: '10E', type: 'economy-class', status: 'available' },
    { label: '10F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '11A', type: 'economy-class', status: 'available' },
    { label: '11B', type: 'economy-class', status: 'available' },
    { label: '11C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '11D', type: 'economy-class', status: 'available' },
    { label: '11E', type: 'economy-class', status: 'available' },
    { label: '11F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '12A', type: 'economy-class', status: 'available' },
    { label: '12B', type: 'economy-class', status: 'available' },
    { label: '12C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '12D', type: 'economy-class', status: 'available' },
    { label: '12E', type: 'economy-class', status: 'available' },
    { label: '12F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '13A', type: 'economy-class', status: 'available' },
    { label: '13B', type: 'economy-class', status: 'available' },
    { label: '13C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '13D', type: 'economy-class', status: 'available' },
    { label: '13E', type: 'economy-class', status: 'available' },
    { label: '13F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '14A', type: 'economy-class', status: 'available' },
    { label: '14B', type: 'economy-class', status: 'available' },
    { label: '14C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '14D', type: 'economy-class', status: 'available' },
    { label: '14E', type: 'economy-class', status: 'available' },
    { label: '14F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '15A', type: 'economy-class', status: 'available' },
    { label: '15B', type: 'economy-class', status: 'available' },
    { label: '15C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '15D', type: 'economy-class', status: 'available' },
    { label: '15E', type: 'economy-class', status: 'available' },
    { label: '15F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '16A', type: 'economy-class', status: 'available' },
    { label: '16B', type: 'economy-class', status: 'available' },
    { label: '16C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '16D', type: 'economy-class', status: 'available' },
    { label: '16E', type: 'economy-class', status: 'available' },
    { label: '16F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '17A', type: 'economy-class', status: 'available' },
    { label: '17B', type: 'economy-class', status: 'available' },
    { label: '17C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '17D', type: 'economy-class', status: 'available' },
    { label: '17E', type: 'economy-class', status: 'available' },
    { label: '17F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '18A', type: 'economy-class', status: 'available' },
    { label: '18B', type: 'economy-class', status: 'available' },
    { label: '18C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '18D', type: 'economy-class', status: 'available' },
    { label: '18E', type: 'economy-class', status: 'available' },
    { label: '18F', type: 'economy-class', status: 'available' }
  ],
  [
    { label: '19A', type: 'economy-class', status: 'available' },
    { label: '19B', type: 'economy-class', status: 'available' },
    { label: '19C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '19D', type: 'economy-class', status: 'available' },
    { label: '19E', type: 'economy-class', status: 'available' },
    { label: '19F', type: 'economy-class', status: 'available' }
  ],
  // Additional row with 4 seats
  [
    
    { label: '20B', type: 'economy-class', status: 'available' },
    { label: '20C', type: 'economy-class', status: 'available' },
    { label: '', type: 'aisle', status: '' },
    { label: '20D', type: 'economy-class', status: 'available' },
    { label: '20E', type: 'economy-class', status: 'available' },
   
  ]
];

const dates = [
  "2024-05-20",
  "2024-05-21",
  "2024-05-22",
  "2024-05-23",
  "2024-05-24"
];

const prices = {
  firstClass: 500,
  businessClass: 300,
  economyClass: 100
};

function BookingPage({ currentUser, selectedSeats, setSelectedSeats }) {
  const [layout, setLayout] = useState(initialLayout);
  const [selectedClass, setSelectedClass] = useState(''); // Default class is blank
  const [showNoSeatsDialog, setShowNoSeatsDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [groupSize, setGroupSize] = useState(1); // Default group size to 1
  const navigate = useNavigate();

  const handleSeatClick = (rowIndex, seatIndex) => {
    if (selectedSeats.length >= 6) {
      alert('You cannot book more than 6 seats at once.');
      return;
    }

    const seat = layout[rowIndex][seatIndex];
    if (seat.status === 'available') {
      const updatedLayout = layout.map(row => row.map(seat => ({ ...seat })));

      // Check if this selection creates single gaps
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
    // Check left side of the seat
    if (seatIndex > 0 && row[seatIndex - 1].status === 'available') {
      // Check if there's an available seat on the left side that would be isolated
      if ((seatIndex - 2 >= 0 && row[seatIndex - 2].status !== 'available') ||
          (seatIndex - 2 < 0)) {
        return true;
      }
    }

    // Check right side of the seat
    if (seatIndex < row.length - 1 && row[seatIndex + 1].status === 'available') {
      // Check if there's an available seat on the right side that would be isolated
      if ((seatIndex + 2 < row.length && row[seatIndex + 2].status !== 'available') ||
          (seatIndex + 2 >= row.length)) {
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
        if (seat.status === 'available' && seat.type === selectedClass) {
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

      // Check at the end of the row
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
    setSelectedSeats(
      [
        ...selectedSeats,
        ...Array.from({ length: groupSize }, (_, i) => ({
          ...updatedLayout[selectedBlock.rowIndex][selectedBlock.start + i],
          rowIndex: selectedBlock.rowIndex,
          seatIndex: selectedBlock.start + i
        }))
      ]
    );
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
    setSelectedSeats([]);

    navigate('/register', { state: { selectedSeats, prices, currentUser } }); // Pass data to register page
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
            <DateSelector dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TicketPrice prices={prices} />
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
                onChange={(e) => setGroupSize(parseInt(e.target.value))}
              />
              {groupSize > 1 && (
                <>
                  <label htmlFor="selectedClass">Class:</label>
                  <select
                    id="selectedClass"
                    value={selectedClass}
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
