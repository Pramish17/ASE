const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.bookSeats);
router.get('/bookings', bookingController.getBookings);

module.exports = router;
