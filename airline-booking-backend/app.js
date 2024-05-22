const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

db.sequelize.sync().then(() => {
  console.log('Database synced');
});

module.exports = app;
