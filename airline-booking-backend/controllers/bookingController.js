const db = require('../models');

exports.bookSeats = async (req, res) => {
  try {
    const { userId, seats, date, selectedClass } = req.body;
    const bookings = await db.Booking.bulkCreate(
      seats.map(seat => ({
        userId,
        seatNumber: seat.label,
        class: selectedClass,
        date
      }))
    );
    res.status(201).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await db.Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
