const express = require('express');
const db = require('../db');

const router = express.Router();

// @route   GET /api/zodiac/:sign
// @desc    Get complete static profile for a zodiac sign
router.get('/:sign', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM zodiac_profiles WHERE LOWER(sign) = LOWER(TRIM($1))', [req.params.sign]);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Zodiac profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
