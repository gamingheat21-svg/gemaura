const express = require('express');
const { protect } = require('../middleware/auth');
const horoscopeService = require('../services/horoscopeService');
const db = require('../db');

const router = express.Router();

// @route   GET /api/horoscope/daily
// @desc    Fetch daily horoscope using AstrologyAPI
router.get('/daily', protect, async (req, res) => {
  try {
    // Fetch user details for DOB and Time
    const userResult = await db.query('SELECT dob, birth_time, birth_location, zodiac_sign FROM users WHERE id = $1', [req.user.id]);
    const user = userResult[0];

    if (!user || !user.dob) {
      return res.status(400).json({ message: 'Date of birth is required to fetch horoscope' });
    }

    const horoscope = await horoscopeService.getDailyHoroscope(
      req.user.id,
      user.zodiac_sign,
      user.dob
    );

    res.json(horoscope);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching horoscope' });
  }
});

module.exports = router;
