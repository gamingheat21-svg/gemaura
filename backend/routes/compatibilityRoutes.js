const express = require('express');
const db = require('../db');

const router = express.Router();

// @route   GET /api/compatibility
// @desc    Get compatibility score between two signs
router.get('/', async (req, res) => {
  const { sign1, sign2 } = req.query;
  if (!sign1 || !sign2) {
    return res.status(400).json({ message: 'sign1 and sign2 query parameters are required' });
  }

  try {
    // Try both orders (sign1-sign2 or sign2-sign1) since compatibility is usually mutual in this simple table
    const result = await db.query(
      'SELECT * FROM compatibility WHERE (sign1 = $1 AND sign2 = $2) OR (sign1 = $3 AND sign2 = $4)', 
      [sign1, sign2, sign2, sign1]
    );
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Compatibility data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
