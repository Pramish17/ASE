const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(awsServerlessExpressMiddleware.eventContext());

const pool = mysql.createPool({
  host: 'airlinebookingdb.ctwm8eou60kv.eu-north-1.rds.amazonaws.com',    
  user: 'root', 
  password: 'rootadmin',
  database: 'airlinebookingdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

// Enable CORS for all methods using cors middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Enable CORS preflight for all routes
app.options('*', cors());

// Endpoint to fetch all seats
app.get('/seats', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM seats');
    res.json(results);
  } catch (err) {
    console.error('Error fetching seats:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to book seats
app.post('/book-seats', async (req, res) => {
  const { seats } = req.body;

  if (!seats || !seats.length) {
    return res.status(400).json({ message: 'No seats provided' });
  }

  const seatIds = seats.map(seat => seat.id);

  try {
    const [results] = await db.query(
      'SELECT * FROM seats WHERE id IN (?) AND status = "available"',
      [seatIds]
    );

    if (results.length !== seatIds.length) {
      return res.status(400).json({ message: 'Some seats are not available' });
    }

    await db.query(
      'UPDATE seats SET status = "booked" WHERE id IN (?)',
      [seatIds]
    );

    res.json({ message: 'Seats booked successfully', seats: seatIds });
  } catch (err) {
    console.error('Error booking seats:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Seating algorithm: find contiguous blocks
app.post('/find-contiguous-blocks', async (req, res) => {
  const { groupSize, seatClass } = req.body;

  try {
    const [results] = await db.query(
      'SELECT * FROM seats WHERE seat_class = ? AND status = "available" ORDER BY seat_row, seat_col',
      [seatClass]
    );

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
  } catch (err) {
    console.error('Error finding contiguous blocks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register user
app.post('/register', async (req, res) => {
  const { username, password, fullName, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, fullName, email]
    );

    console.log(`User ${username} registered successfully`);
    res.status(201).json({ message: 'User registered successfully', user: { username, fullName, email } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Username already exists' });
    }
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name } });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;
