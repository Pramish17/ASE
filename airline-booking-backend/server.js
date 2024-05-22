const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 4000;

app.use(cors()); // Use the cors middleware
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'airline_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Endpoint to fetch all seats
app.get('/seats', (req, res) => {
  db.query('SELECT * FROM seats', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to book seats
app.post('/book-seats', (req, res) => {
  const { seatIds, userId } = req.body;
  
  db.query(
    'SELECT * FROM seats WHERE id IN (?) AND status = "available"',
    [seatIds],
    (err, results) => {
      if (err) throw err;
      
      if (results.length !== seatIds.length) {
        return res.status(400).json({ message: 'Some seats are not available' });
      }

      db.query(
        'UPDATE seats SET status = "booked", user_id = ? WHERE id IN (?)',
        [userId, seatIds],
        (err) => {
          if (err) throw err;
          res.json({ message: 'Seats booked successfully' });
        }
      );
    }
  );
});

// Seating algorithm: find contiguous blocks
app.post('/find-contiguous-blocks', (req, res) => {
  const { groupSize, seatClass } = req.body;

  db.query(
    'SELECT * FROM seats WHERE seat_class = ? AND status = "available" ORDER BY seat_row, seat_col',
    [seatClass],
    (err, results) => {
      if (err) throw err;

      const layout = results.reduce((acc, seat) => {
        if (!acc[seat.seat_row]) acc[seat.seat_row] = [];
        acc[seat.seat_row][seat.seat_col] = seat;
        return acc;
      }, {});

      const blocks = [];
      Object.keys(layout).forEach(row => {
        let count = 0;
        let start = -1;

        layout[row].forEach((seat, col) => {
          if (seat && seat.status === 'available') {
            if (start === -1) start = col;
            count++;
          } else {
            if (count >= groupSize) {
              blocks.push({ row: parseInt(row), start, count });
            }
            count = 0;
            start = -1;
          }
        });

        if (count >= groupSize) {
          blocks.push({ row: parseInt(row), start, count });
        }
      });

      res.json(blocks);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
