const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'airline-booking.ctwm8eou60kv.eu-north-1.rds.amazonaws.com',
  user: 'root',
  password: 'rootadmin',
  database: 'airline-booking'
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
  const { seats } = req.body;

  if (!seats || !seats.length) {
    return res.status(400).json({ message: 'No seats provided' });
  }

  const seatIds = seats.map(seat => seat.id);

  db.query(
    'SELECT * FROM seats WHERE id IN (?) AND status = "available"',
    [seatIds],
    (err, results) => {
      if (err) throw err;

      if (results.length !== seatIds.length) {
        return res.status(400).json({ message: 'Some seats are not available' });
      }

      db.query(
        'UPDATE seats SET status = "booked" WHERE id IN (?)',
        [seatIds],
        (err) => {
          if (err) throw err;
          res.json({ message: 'Seats booked successfully', seats: seatIds });
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

// Register user
app.post('/register', async (req, res) => {
  const { username, password, fullName, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, fullName, email],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username already exists' });
          }
          throw err;
        }
        console.log(`User ${username} registered successfully`);
        res.status(201).json({ message: 'User registered successfully', user: { id: results.insertId, username, fullName, email } });
      }
    );
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  console.log(`Attempting login for username: ${username}`);

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      console.log(`No user found with username: ${username}`);
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    console.log(`User found: ${user.username}, comparing passwords...`);

    try {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        console.log('Password match, login successful');
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name } });
      } else {
        console.log('Password does not match');
        res.status(400).json({ message: 'Invalid username or password' });
      }
    } catch (err) {
      console.error('Error comparing passwords:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
